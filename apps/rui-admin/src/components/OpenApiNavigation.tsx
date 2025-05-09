'use client'
import { RuiApiDocument } from "rui-core"
import { useState } from "react"
import { OpenAPIV3 } from "openapi-types"

type Props = {
    api: RuiApiDocument
    onSelectProperty?: (path: string, schema: OpenAPIV3.SchemaObject, context: SchemaContext) => void
}

type SchemaContext = {
    endpoint?: string
    method?: string
    location: 'request' | 'response' | 'component'
    statusCode?: string
    contentType?: string
}

export function OpenApiNavigation({api, onSelectProperty}: Props) {
    const [selectedPath, setSelectedPath] = useState<string | null>(null)
    const schemas = api.document.components?.schemas || {}
    const paths = api.document.paths || {}
    
    const handleSelect = (path: string, schema: any, context: SchemaContext) => {
        setSelectedPath(path)
        console.log('Selected path:', path, context)
        if (onSelectProperty && !isReference(schema)) {
            onSelectProperty(path, schema, context)
        }
    }
    
    const resolveReference = (ref: string): OpenAPIV3.SchemaObject | undefined => {
        if (ref.startsWith('#/components/schemas/')) {
            const schemaName = ref.split('/').pop();
            if (schemaName && schemas[schemaName]) {
                return schemas[schemaName] as OpenAPIV3.SchemaObject;
            }
        }
        return undefined;
    }
    
    return <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
        <h3 className="font-medium text-lg px-4 py-3 bg-gray-50 border-b">{api.name}</h3>
        <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            <div className="py-2">
                <div className="px-4 py-2 font-medium text-sm text-gray-700 bg-gray-50">Endpoints</div>
                {Object.entries(paths).map(([path, pathItem]) => (
                    <EndpointTree 
                        key={path}
                        path={path}
                        pathItem={pathItem as OpenAPIV3.PathItemObject}
                        onSelect={handleSelect}
                        selectedPath={selectedPath}
                        resolveReference={resolveReference}
                    />
                ))}
            </div>
        </div>
    </div>
}

function EndpointTree({
    path,
    pathItem,
    onSelect,
    selectedPath,
    resolveReference
}: {
    path: string
    pathItem: OpenAPIV3.PathItemObject
    onSelect: (path: string, schema: any, context: SchemaContext) => void
    selectedPath: string | null
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
}) {
    const [expanded, setExpanded] = useState(false)
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'] as const;
    
    const hasOperations = methods.some(method => pathItem[method]);
    
    if (!hasOperations) return null;
    
    return (
        <div>
            <div 
                className="px-4 py-2 text-sm flex items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <button 
                    className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500 hover:text-gray-700 focus:outline-none" 
                >
                    <svg 
                        className={`w-3 h-3 transform ${expanded ? 'rotate-90' : ''} transition-transform`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
                <span className="font-medium text-gray-800">{path}</span>
            </div>
            
            {expanded && methods.map(method => {
                const operation = pathItem[method];
                if (!operation) return null;
                
                return (
                    <OperationTree
                        key={method}
                        method={method}
                        operation={operation}
                        endpoint={path}
                        onSelect={onSelect}
                        selectedPath={selectedPath}
                        resolveReference={resolveReference}
                    />
                );
            })}
        </div>
    );
}

function OperationTree({
    method,
    operation,
    endpoint,
    onSelect,
    selectedPath,
    resolveReference
}: {
    method: string
    operation: OpenAPIV3.OperationObject
    endpoint: string
    onSelect: (path: string, schema: any, context: SchemaContext) => void
    selectedPath: string | null
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
}) {
    const [expanded, setExpanded] = useState(false);
    const operationId = operation.operationId || `${method}-${endpoint}`;
    
    const hasRequestBody = operation.requestBody;
    const hasResponses = operation.responses && Object.keys(operation.responses).length > 0;
    
    if (!hasRequestBody && !hasResponses) return null;
    
    const methodColors: Record<string, string> = {
        get: 'bg-blue-100 text-blue-800',
        post: 'bg-green-100 text-green-800',
        put: 'bg-yellow-100 text-yellow-800',
        delete: 'bg-red-100 text-red-800',
        patch: 'bg-purple-100 text-purple-800',
        options: 'bg-gray-100 text-gray-800',
        head: 'bg-gray-100 text-gray-800'
    };
    
    return (
        <div className="ml-4">
            <div 
                className="px-4 py-2 text-sm flex items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <button 
                    className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500 hover:text-gray-700 focus:outline-none" 
                >
                    <svg 
                        className={`w-3 h-3 transform ${expanded ? 'rotate-90' : ''} transition-transform`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
                <span className={`uppercase font-bold px-2 py-0.5 rounded text-xs mr-2 ${methodColors[method] || 'bg-gray-100'}`}>
                    {method}
                </span>
                <span className="font-medium">{operation.summary || operationId}</span>
            </div>
            
            {expanded && (
                <div className="ml-4">
                    {hasRequestBody && renderRequestBody(
                        operation.requestBody, 
                        `${endpoint}.${method}.requestBody`, 
                        endpoint, 
                        method, 
                        onSelect, 
                        selectedPath,
                        resolveReference
                    )}
                    
                    {hasResponses && (
                        <div>
                            {Object.entries(operation.responses).map(([statusCode, response]) => 
                                renderResponse(
                                    statusCode, 
                                    response, 
                                    `${endpoint}.${method}.responses.${statusCode}`, 
                                    endpoint, 
                                    method, 
                                    onSelect, 
                                    selectedPath,
                                    resolveReference
                                )
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function renderRequestBody(
    requestBody: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject | undefined,
    path: string,
    endpoint: string,
    method: string,
    onSelect: (path: string, schema: any, context: SchemaContext) => void,
    selectedPath: string | null,
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
) {
    if (!requestBody) return null;
    
    let resolvedRequestBody = requestBody;
    
    if ('$ref' in requestBody) {
        const refName = requestBody.$ref;
        return (
            <div className="px-4 py-2 text-sm flex items-center font-medium text-blue-700">
                Request Body ({getRefName(refName)})
            </div>
        );
    }
    
    const content = resolvedRequestBody.content || {};
    
    return (
        <div>
            {Object.entries(content).map(([contentType, mediaType]) => {
                let schema = mediaType.schema;
                if (!schema) return null;
                
                let resolvedSchema = schema;
                if (isReference(schema) && schema.$ref) {
                    const resolved = resolveReference(schema.$ref);
                    if (resolved) {
                        resolvedSchema = resolved;
                    }
                }
                
                const context: SchemaContext = {
                    endpoint,
                    method,
                    location: 'request',
                    contentType
                };
                
                return (
                    <div key={contentType}>
                        <div className="px-4 py-2 text-sm font-medium text-blue-700 flex items-center">
                            <span>Request Body</span>
                            {isReference(schema) && (
                                <span className="ml-2 text-xs text-gray-600">
                                    ({getRefName(schema.$ref)})
                                </span>
                            )}
                        </div>
                        
                        <SchemaPropertyTree
                            schema={resolvedSchema}
                            path={`${path}.content.${contentType}.schema`}
                            onSelect={(schemaPath, schemaObj) => onSelect(schemaPath, schemaObj, context)}
                            selectedPath={selectedPath}
                            level={1}
                            resolveReference={resolveReference}
                        />
                    </div>
                );
            })}
        </div>
    );
}

function renderResponse(
    statusCode: string,
    response: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject,
    path: string,
    endpoint: string,
    method: string,
    onSelect: (path: string, schema: any, context: SchemaContext) => void,
    selectedPath: string | null,
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
) {
    let resolvedResponse = response;
    
    if ('$ref' in response) {
        return (
            <div key={statusCode} className="px-4 py-2 text-sm font-medium text-green-700">
                Response {statusCode} ({getRefName(response.$ref)})
            </div>
        );
    }
    
    const content = resolvedResponse.content || {};
    const hasContent = Object.keys(content).length > 0;
    
    if (!hasContent) {
        return null;
    }
    
    return (
        <div key={statusCode}>
            {Object.entries(content).map(([contentType, mediaType]) => {
                let schema = mediaType.schema;
                if (!schema) return null;
                
                let resolvedSchema = schema;
                if (isReference(schema) && schema.$ref) {
                    const resolved = resolveReference(schema.$ref);
                    if (resolved) {
                        resolvedSchema = resolved;
                    }
                }
                
                const context: SchemaContext = {
                    endpoint,
                    method,
                    location: 'response',
                    statusCode,
                    contentType
                };
                
                return (
                    <div key={contentType}>
                        <div className="px-4 py-2 text-sm font-medium text-green-700 flex items-center">
                            <span>Response {statusCode}</span>
                            {isReference(resolvedSchema) && (
                                <span className="ml-2 text-xs text-gray-600">
                                    ({getRefName(resolvedSchema.$ref)})
                                </span>
                            )}
                        </div>
                        
                        <SchemaPropertyTree
                            schema={resolvedSchema}
                            path={`${path}.content.${contentType}.schema`}
                            onSelect={(schemaPath, schemaObj) => onSelect(schemaPath, schemaObj, context)}
                            selectedPath={selectedPath}
                            level={1}
                            resolveReference={resolveReference}
                        />
                    </div>
                );
            })}
        </div>
    );
}

function SchemaPropertyTree({
    schema,
    path,
    onSelect,
    selectedPath,
    level = 0,
    resolveReference
}: {
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
    path: string
    onSelect: (path: string, schema: any) => void
    selectedPath: string | null
    level: number
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
}) {
    if (isReference(schema)) {
        const refName = schema.$ref;
        const resolvedSchema = resolveReference(refName);
        
        if (resolvedSchema) {
            return (
                <div>
                    <div className="px-4 py-2 text-sm text-gray-600 italic" style={{ paddingLeft: `${level * 16 + 16}px` }}>
                        Reference: {getRefName(refName)}
                    </div>
                    <SchemaPropertyTree 
                        schema={resolvedSchema}
                        path={path}
                        onSelect={onSelect}
                        selectedPath={selectedPath}
                        level={level}
                        resolveReference={resolveReference}
                    />
                </div>
            );
        }
        
        return (
            <div 
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center ${selectedPath === path ? 'bg-blue-50 text-blue-700' : ''}`}
                style={{ paddingLeft: `${level * 16 + 16}px` }}
                onClick={() => onSelect(path, schema)}
            >
                <span className="font-medium text-gray-600 italic">Reference: {getRefName(refName)}</span>
            </div>
        );
    }

    if (schema.type === 'object' && schema.properties) {
        return (
            <div>
                {Object.entries(schema.properties).map(([propName, propSchema]) => (
                    <SchemaTree
                        key={propName}
                        name={propName}
                        path={`${path}.${propName}`}
                        schema={propSchema}
                        onSelect={onSelect}
                        selectedPath={selectedPath}
                        level={level}
                        resolveReference={resolveReference}
                    />
                ))}
            </div>
        );
    }
    
    if (schema.type === 'array' && schema.items) {
        return (
            <div>
                {/* <div className="px-4 py-2 text-sm text-gray-500" style={{ paddingLeft: `${level * 16 + 16}px` }}>
                    Array items:
                </div> */}
                <SchemaPropertyTree
                    schema={schema.items}
                    path={`${path}.items`}
                    onSelect={onSelect}
                    selectedPath={selectedPath}
                    level={level + 1}
                    resolveReference={resolveReference}
                />
            </div>
        );
    }
    
    return (
        <div 
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${selectedPath === path ? 'bg-blue-50 text-blue-700' : ''}`}
            style={{ paddingLeft: `${level * 16 + 16}px` }}
            onClick={() => onSelect(path, schema)}
        >
            <span className="font-medium">{schema.type || 'unknown'}</span>
            {schema.format && <span className="ml-1 text-gray-500">({schema.format})</span>}
        </div>
    );
}

function SchemaTree({
    name,
    path,
    schema,
    onSelect,
    selectedPath,
    level = 0,
    resolveReference
}: {
    name: string
    path: string
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
    onSelect: (path: string, schema: any) => void
    selectedPath: string | null
    level: number
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
}) {
    const [expanded, setExpanded] = useState(level < 1)
    const isSelected = selectedPath === path
    
    if (isReference(schema)) {
        const refName = schema.$ref;
        const resolvedSchema = resolveReference(refName);
        
        return (
            <div>
                <div 
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center ${isSelected ? 'bg-blue-50 text-blue-700' : ''}`} 
                    style={{ paddingLeft: `${level * 16 + 16}px` }}
                >
                    <button 
                        className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500 hover:text-gray-700 focus:outline-none" 
                        onClick={() => setExpanded(!expanded)}
                        aria-label={expanded ? "Collapse" : "Expand"}
                    >
                        <svg 
                            className={`w-3 h-3 transform ${expanded ? 'rotate-90' : ''} transition-transform`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    <span className="font-medium" onClick={() => onSelect(path, schema)}>
                        {name}:
                    </span>
                    <span className="ml-1 text-gray-600 italic" onClick={() => onSelect(path, schema)}>
                        {getRefName(refName)}
                    </span>
                </div>
                
                {expanded && resolvedSchema && (
                    <div className="pl-4 border-l border-gray-200 ml-4">
                        <SchemaPropertyTree 
                            schema={resolvedSchema}
                            path={path}
                            onSelect={onSelect}
                            selectedPath={selectedPath}
                            level={level + 1}
                            resolveReference={resolveReference}
                        />
                    </div>
                )}
            </div>
        );
    }

    const hasProperties = schema.properties && Object.keys(schema.properties).length > 0
    const hasItems = schema.type === 'array' && schema.items
    const hasChildren = hasProperties || hasItems
    
    return (
        <div>
            <div 
                className={`px-4 py-2 text-sm flex items-center ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} 
                style={{ paddingLeft: `${level * 16 + 16}px` }}
            >
                {hasChildren && (
                    <button 
                        className="w-4 h-4 flex items-center justify-center mr-1 text-gray-500 hover:text-gray-700 focus:outline-none" 
                        onClick={() => setExpanded(!expanded)}
                        aria-label={expanded ? "Collapse" : "Expand"}
                    >
                        <svg 
                            className={`w-3 h-3 transform ${expanded ? 'rotate-90' : ''} transition-transform`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                )}
                <span 
                    className={`${hasChildren ? '' : 'ml-5'} cursor-pointer`}
                    onClick={() => onSelect(path, schema)}
                >
                    <span className="font-medium">{name}</span>
                    {schema.type && <span className="text-gray-500 ml-1">: {schema.type}</span>}
                </span>
            </div>
            
            {expanded && hasProperties && (
                <div>
                    {Object.entries(schema.properties || {}).map(([propName, propSchema]) => (
                        <SchemaTree
                            key={propName}
                            name={propName}
                            path={`${path}.${propName}`}
                            schema={propSchema}
                            onSelect={onSelect}
                            selectedPath={selectedPath}
                            level={level + 1}
                            resolveReference={resolveReference}
                        />
                    ))}
                </div>
            )}
            
            {expanded && hasItems && (
                <SchemaTree
                    key="items"
                    name="items"
                    path={`${path}.items`}
                    schema={schema.items}
                    onSelect={onSelect}
                    selectedPath={selectedPath}
                    level={level + 1}
                    resolveReference={resolveReference}
                />
            )}
        </div>
    )
}

function isReference(schema: any): schema is OpenAPIV3.ReferenceObject {
    return schema && '$ref' in schema
}

function getRefName(ref: string): string {
    const parts = ref.split('/')
    return parts[parts.length - 1]
}