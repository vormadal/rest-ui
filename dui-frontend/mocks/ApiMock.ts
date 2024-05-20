import { createServer } from 'miragejs'
import { OpenAPIV3 } from 'openapi-types'
import { MockBuilder } from './MockBuilder'
interface Options {
  baseUrl?: string
  namespace?: string
}
export class ApiMock {
  constructor(private readonly document: OpenAPIV3.Document) {}

  createServerInstance(options: Options) {
    const document = this.document
    const paths = Object.keys(this.document.paths)
    const mockBuilder = new MockBuilder(this.document)
    const methods = [
      OpenAPIV3.HttpMethods.GET,
      OpenAPIV3.HttpMethods.POST,
      OpenAPIV3.HttpMethods.PUT,
      OpenAPIV3.HttpMethods.DELETE,
      OpenAPIV3.HttpMethods.PATCH
    ]

    function getResponseSchema(operation: OpenAPIV3.OperationObject) {
      const response = mockBuilder.resolveReference<OpenAPIV3.ResponseObject>(operation.responses[200])
      return response.content!['application/json']!.schema!
    }
    createServer({
      // urlPrefix: options.baseUrl ,
      // namespace: options.namespace,
      routes() {
        if (options.namespace) {
          this.namespace = options.namespace
        }
        this.urlPrefix = options.baseUrl || document.servers![0].url
        for (const route of paths) {
          for (const method of methods) {
            const operation = document.paths[route]![method]! as OpenAPIV3.OperationObject
            if (!operation) continue

            switch (method) {
              case OpenAPIV3.HttpMethods.GET:
                this.get(route.replaceAll('{', ':').replaceAll('}', ''), () => {
                  return mockBuilder.createMock(getResponseSchema(operation))
                })
              case OpenAPIV3.HttpMethods.PUT:
              case OpenAPIV3.HttpMethods.POST:
              case OpenAPIV3.HttpMethods.DELETE:
              case OpenAPIV3.HttpMethods.OPTIONS:
              case OpenAPIV3.HttpMethods.HEAD:
              case OpenAPIV3.HttpMethods.PATCH:
              case OpenAPIV3.HttpMethods.TRACE:
            }
          }
        }
      }
    })
  }
}

function createMockObject() {}
