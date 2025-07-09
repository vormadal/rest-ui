'use client'
import { RuiApiDocument } from "rui-core"
import React, { useState } from "react"
import { OpenAPIV3 } from "openapi-types"

type Props = {
    api: RuiApiDocument
    onSelectProperty?: (path: string, schema: OpenAPIV3.SchemaObject, context: SchemaContext) => void
    allowedMethods?: string[]
}

type SchemaContext = {
    endpoint?: string
    method?: string
    location: 'request' | 'response' | 'component'
    statusCode?: string
    contentType?: string
}

export function OpenApiNavigation({ api, onSelectProperty, allowedMethods }: Props) {
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
        const schemaName = ref.split('/').pop()
        return schemaName && schemas[schemaName] ? schemas[schemaName] as OpenAPIV3.SchemaObject : undefined
    }
    
    return (
        <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
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
                            allowedMethods={allowedMethods}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

// Collapsible tree item component
function TreeItem({ 
    title, 
    children, 
    defaultExpanded = false, 
    className = "",
    onClick 
}: {
    title: React.ReactNode
    children?: React.ReactNode
    defaultExpanded?: boolean
    className?: string
    onClick?: () => void
}) {
    const [expanded, setExpanded] = useState(defaultExpanded)
    const hasChildren = React.Children.count(children) > 0
    
    return (
        <div>
            <div 
                className={`px-4 py-2 text-sm flex items-center hover:bg-gray-50 cursor-pointer ${className}`}
                onClick={() => {
                    if (hasChildren) setExpanded(!expanded)
                    onClick?.()
                }}
            >
                {hasChildren && (
                    <ExpandIcon expanded={expanded} />
                )}
                {title}
            </div>
            {expanded && hasChildren && (
                <div className="ml-4">
                    {children}
                </div>
            )}
        </div>
    )
}

function ExpandIcon({ expanded }: { expanded: boolean }) {
    return (
        <svg 
            className={`w-3 h-3 mr-1 transform ${expanded ? 'rotate-90' : ''} transition-transform text-gray-500`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
    )
}

function EndpointTree({ path, pathItem, onSelect, selectedPath, resolveReference, allowedMethods }: {
    path: string
    pathItem: OpenAPIV3.PathItemObject
    onSelect: (path: string, schema: any, context: SchemaContext) => void
    selectedPath: string | null
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
    allowedMethods?: string[]
}) {
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'] as const
    const operations = methods.filter(method => {
        if (!pathItem[method]) return false
        if (!allowedMethods) return true
        return allowedMethods.includes(method)
    })
    
    if (operations.length === 0) return null
    
    return (
        <TreeItem title={<span className="font-medium text-gray-800">{path}</span>}>
            {operations.map(method => (
                <OperationTree
                    key={method}
                    method={method}
                    operation={pathItem[method]!}
                    endpoint={path}
                    onSelect={onSelect}
                    selectedPath={selectedPath}
                    resolveReference={resolveReference}
                />
            ))}
        </TreeItem>
    )
}

const METHOD_COLORS: Record<string, string> = {
    get: 'bg-blue-100 text-blue-800',
    post: 'bg-green-100 text-green-800',
    put: 'bg-yellow-100 text-yellow-800',
    delete: 'bg-red-100 text-red-800',
    patch: 'bg-purple-100 text-purple-800',
    options: 'bg-gray-100 text-gray-800',
    head: 'bg-gray-100 text-gray-800'
}

function OperationTree({ method, operation, endpoint, onSelect, selectedPath, resolveReference }: {
    method: string
    operation: OpenAPIV3.OperationObject
    endpoint: string
    onSelect: (path: string, schema: any, context: SchemaContext) => void
    selectedPath: string | null
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
}) {
    const operationId = operation.operationId || `${method}-${endpoint}`
    const hasContent = operation.requestBody || (operation.responses && Object.keys(operation.responses).length > 0)
    
    if (!hasContent) return null
    
    const title = (
        <>
            <span className={`uppercase font-bold px-2 py-0.5 rounded text-xs mr-2 ${METHOD_COLORS[method] || 'bg-gray-100'}`}>
                {method}
            </span>
            <span className="font-medium">{operation.summary || operationId}</span>
        </>
    )
    
    return (
        <TreeItem title={title}>
            {operation.requestBody && (
                <ContentSection
                    type="request"
                    content={operation.requestBody}
                    basePath={`${endpoint}.${method}.requestBody`}
                    context={{ endpoint, method, location: 'request' }}
                    onSelect={onSelect}
                    selectedPath={selectedPath}
                    resolveReference={resolveReference}
                />
            )}
            
            {operation.responses && Object.entries(operation.responses).map(([statusCode, response]) => (
                <ContentSection
                    key={statusCode}
                    type="response"
                    content={response}
                    basePath={`${endpoint}.${method}.responses.${statusCode}`}
                    context={{ endpoint, method, location: 'response', statusCode }}
                    statusCode={statusCode}
                    onSelect={onSelect}
                    selectedPath={selectedPath}
                    resolveReference={resolveReference}
                />
            ))}
        </TreeItem>
    )
}

function ContentSection({ 
    type, 
    content, 
    basePath, 
    context, 
    statusCode, 
    onSelect, 
    selectedPath, 
    resolveReference 
}: {
    type: 'request' | 'response'
    content: OpenAPIV3.RequestBodyObject | OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject
    basePath: string
    context: Omit<SchemaContext, 'contentType'>
    statusCode?: string
    onSelect: (path: string, schema: any, context: SchemaContext) => void
    selectedPath: string | null
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
}) {
    if (isReference(content)) {
        const label = type === 'request' ? 'Request Body' : `Response ${statusCode}`
        return (
            <div className="px-4 py-2 text-sm font-medium text-blue-700">
                {label} ({getRefName(content.$ref)})
            </div>
        )
    }
    
    const contentEntries = Object.entries(content.content || {})
    if (contentEntries.length === 0) return null
    
    return (
        <>
            {contentEntries.map(([contentType, mediaType]) => {
                if (!mediaType.schema) return null
                
                const resolvedSchema = isReference(mediaType.schema) && mediaType.schema.$ref
                    ? resolveReference(mediaType.schema.$ref) || mediaType.schema
                    : mediaType.schema
                
                const fullContext: SchemaContext = { ...context, contentType }
                const label = type === 'request' ? 'Request Body' : `Response ${statusCode}`
                
                return (
                    <div key={contentType}>
                        <div className={`px-4 py-2 text-sm font-medium flex items-center ${type === 'request' ? 'text-blue-700' : 'text-green-700'}`}>
                            <span>{label}</span>
                            {isReference(mediaType.schema) && (
                                <span className="ml-2 text-xs text-gray-600">
                                    ({getRefName(mediaType.schema.$ref)})
                                </span>
                            )}
                        </div>
                        
                        <SchemaTree
                            schema={resolvedSchema}
                            path={`${basePath}.content.${contentType}.schema`}
                            onSelect={(schemaPath, schemaObj) => onSelect(schemaPath, schemaObj, fullContext)}
                            selectedPath={selectedPath}
                            level={1}
                            resolveReference={resolveReference}
                        />
                    </div>
                )
            })}
        </>
    )
}

function SchemaTree({ schema, path, onSelect, selectedPath, level = 0, name, resolveReference }: {
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
    path: string
    onSelect: (path: string, schema: any) => void
    selectedPath: string | null
    level: number
    name?: string
    resolveReference: (ref: string) => OpenAPIV3.SchemaObject | undefined
}) {
    const isSelected = selectedPath === path
    const indent = level * 16 + 16
    
    if (isReference(schema)) {
        const resolvedSchema = resolveReference(schema.$ref)
        const refName = getRefName(schema.$ref)
        
        const title = name ? `${name}: ${refName}` : `Reference: ${refName}`
        
        return (
            <TreeItem 
                title={
                    <span 
                        className={`font-medium text-gray-600 italic ${isSelected ? 'text-blue-700' : ''}`}
                        onClick={() => onSelect(path, schema)}
                    >
                        {title}
                    </span>
                }
                defaultExpanded={level < 1}
                className={isSelected ? 'bg-blue-50' : ''}
            >
                {resolvedSchema && (
                    <div className="pl-4 border-l border-gray-200">
                        <SchemaTree 
                            schema={resolvedSchema}
                            path={path}
                            onSelect={onSelect}
                            selectedPath={selectedPath}
                            level={level + 1}
                            resolveReference={resolveReference}
                        />
                    </div>
                )}
            </TreeItem>
        )
    }
    
    // Handle primitive types
    if (!schema.properties && schema.type !== 'array') {
        return (
            <div 
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50 text-blue-700' : ''}`}
                style={{ paddingLeft: `${indent}px` }}
                onClick={() => onSelect(path, schema)}
            >
                {name && <span className="font-medium">{name}: </span>}
                <span className="font-medium">{schema.type || 'unknown'}</span>
                {schema.format && <span className="ml-1 text-gray-500">({schema.format})</span>}
            </div>
        )
    }
    
    // Handle arrays
    if (schema.type === 'array' && schema.items) {
        const title = name ? `${name}: array` : 'array'
        
        return (
            <TreeItem 
                title={
                    <span 
                        className={`font-medium ${isSelected ? 'text-blue-700' : ''}`}
                        onClick={() => onSelect(path, schema)}
                    >
                        {title}
                    </span>
                }
                defaultExpanded={level < 1}
                className={isSelected ? 'bg-blue-50' : ''}
            >
                <SchemaTree
                    schema={schema.items}
                    path={`${path}.items`}
                    onSelect={onSelect}
                    selectedPath={selectedPath}
                    level={level + 1}
                    name="items"
                    resolveReference={resolveReference}
                />
            </TreeItem>
        )
    }
    
    // Handle objects
    const properties = Object.entries(schema.properties || {})
    if (properties.length === 0) {
        return (
            <div 
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50 text-blue-700' : ''}`}
                style={{ paddingLeft: `${indent}px` }}
                onClick={() => onSelect(path, schema)}
            >
                {name && <span className="font-medium">{name}: </span>}
                <span className="font-medium">object</span>
            </div>
        )
    }
    
    const title = name ? `${name}: object` : 'object'
    
    return (
        <TreeItem 
            title={
                <span 
                    className={`font-medium ${isSelected ? 'text-blue-700' : ''}`}
                    onClick={() => onSelect(path, schema)}
                >
                    {title}
                </span>
            }
            defaultExpanded={level < 1}
            className={isSelected ? 'bg-blue-50' : ''}
        >
            {properties.map(([propName, propSchema]) => (
                <SchemaTree
                    key={propName}
                    schema={propSchema}
                    path={`${path}.${propName}`}
                    onSelect={onSelect}
                    selectedPath={selectedPath}
                    level={level + 1}
                    name={propName}
                    resolveReference={resolveReference}
                />
            ))}
        </TreeItem>
    )
}

function isReference(schema: any): schema is OpenAPIV3.ReferenceObject {
    return schema && '$ref' in schema
}

function getRefName(ref: string): string {
    return ref.split('/').pop() || ref
}