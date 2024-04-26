import { FirstLowerCase } from '../../utils/stringUtils'
import { HttpMethods } from './HttpMethods'
import type { OperationObject } from './OperationObject'

export default class Endpoint {
  public operationName: string
  constructor(
    public method: HttpMethods, 
    public path: string, 
    public source: OperationObject
  ) {
    // TODO does not handle if operationId is duplicate.
    // nswag is able to handle it though
    this.operationName = FirstLowerCase(source.operationId || getOperationName(this))
  }
}

function getOperationName(endpoint: Endpoint): string {
  const parts = endpoint.path.split('/')
  let part = 0
  let suffix = ''

  switch (endpoint.method) {
    case HttpMethods.GET:
      if (endpoint.path.endsWith('}')) {
        part = parts.length - 2
        suffix = 'GET'
      } else {
        part = parts.length - 1
        suffix = 'All'
      }
      break
    default:
      suffix = endpoint.method.toUpperCase()
      part = parts.length - (endpoint.path.endsWith('}') ? 2 : 1)
      break
  }

  return `${FirstLowerCase(parts[part])}${suffix}`
}
