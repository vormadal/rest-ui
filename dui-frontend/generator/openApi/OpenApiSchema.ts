import { OpenAPIV2, OpenAPIV3 } from 'openapi-types'
import Endpoint from './Endpoint'
import { getEndpoints, getSchemaComponents, getViews, resolveReferenceObject } from './v3/OpenApiV3ReferenceResolver'

export default class OpenApiSchema {
  private _views: View[] = []
  private _components: Map<string, OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | OpenAPIV3.RequestBodyObject> =
    new Map()

  public endpoints: Endpoint[]

  constructor(public openapiSpec: OpenAPIV3.Document, public generator: CodeGenerator) {
    const version = openapiSpec.openapi || (openapiSpec as unknown as OpenAPIV2.Document).swagger
    if (!version.startsWith('3.0')) {
      console.warn('unsupported OpenAPI version', version)
    }

    this._components = getSchemaComponents(this.openapiSpec)
    this.endpoints = getEndpoints(openapiSpec)
    this._views = getViews(this.endpoints, this)
  }

  public resolveReference = <T = OpenAPIV3.SchemaObject>(ref: OpenAPIV3.ReferenceObject | T) => {
    return resolveReferenceObject(this._components, ref)
  }

  public resolveListReference = <T = OpenAPIV3.SchemaObject>(ref?: OpenAPIV3.ReferenceObject | T): T => {
    let refObj: OpenAPIV3.ReferenceObject | T = ref
    if ((ref as OpenAPIV3.SchemaObject)?.type === 'array') {
      refObj = (ref as OpenAPIV3.ArraySchemaObject).items as T
    }

    // TODO - currently we assume this is always a reference object not a schema object
    return resolveReferenceObject<T>(this._components, refObj)
  }

  public resolveEndpoint = (method: OpenAPIV3.HttpMethods, path: string) => {
    return this.endpoints.find((x) => x.method === method && x.path === path)
  }

  get views(): View[] {
    return this._views
  }
}
