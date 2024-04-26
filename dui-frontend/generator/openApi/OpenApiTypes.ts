import { OpenAPIV3 } from 'openapi-types'
import Endpoint from './Endpoint'

export type SchemaResolver = <T>(ref: OpenAPIV3.ReferenceObject | T) => T

export type EndpointResolver = (method: OpenAPIV3.HttpMethods, path: string) => Endpoint

export type SchemaComponentMap = Map<string, AnySchema>

export type AnySchema = OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | OpenAPIV3.RequestBodyObject
