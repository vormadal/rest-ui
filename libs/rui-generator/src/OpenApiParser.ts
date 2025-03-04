import { OpenAPIV3 } from 'openapi-types'
import { EndpointBuilder } from './EndpointBuilder'
import { PageGroup } from './EndpointGroup'
import { PageBuilder } from './PageBuilder'
import type { ParserOptions } from './ParserOptions'
import { PageContext } from './context/PageContext'
import { HttpMethods } from './openApi/HttpMethods'
import { RuiAppSpec } from '../../../../../libs/rui-core/src'

const defaultOptions: ParserOptions = {
  request: {},
  response: {},
  pagingResponse: {
    dataField: 'data'
  },
  fieldsToHide: ['id', 'href', 'created', 'modified', 'modifiedOn', 'createdOn']
}
export class OpenApiParser {
  readonly context: PageContext

  constructor(readonly document: OpenAPIV3.Document) {
    this.context = new PageContext(document, defaultOptions)
  }

  parse(): RuiAppSpec {
    const version = this.document.openapi
    if (version.startsWith('3')) {
      return this.parseV3()
    }

    throw new Error('this document type cannot be handled')
  }

  private parseV3(): RuiAppSpec {
    const endpoints = this.getEndpoints()
    this.context.endpoints = endpoints
    const pages = endpoints.map((x) => new PageBuilder(x, this.context))
    const groups = this.getPageGroups(pages)
    this.context.pageGroups = groups

    for (const page of pages) {
      page.pageGroup = groups.find((x) => x.name === page.endpoint.resourceName)
    }

    return {
      baseUrl: this.document.servers?.length ? this.document.servers[0].url : '/',
      dashboards: [], //TODO implement
      // {
      //   pages: pages
      //     // .filter((x) => x.pageType === DuiPageType.list)
      //     .filter((x) => x.dataSourceAction?.method === 'GET')
      //     .filter((x) => x.endpoint.datasourceAction?.paramaters?.filter((param) => param.from === 'path').length === 0)
      //     .map((x) => x.route)
      // },
      pages: pages.filter((x) => !!x.pageType).map((x) => x.spec)
    }
  }

  private getEndpoints() {
    if (!this.document?.paths) return []

    const paths = Object.keys(this.document.paths)
    const endpoints: EndpointBuilder[] = []

    const relevantMethods = [HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT, HttpMethods.DELETE]

    for (const path of paths) {
      const methods = Object.keys(this.document.paths[path] || {}) as HttpMethods[]

      for (const method of methods.filter((x) => relevantMethods.includes(x))) {
        endpoints.push(new EndpointBuilder(path, method, this.context))
      }
    }

    return endpoints
  }

  private getPageGroups(pages: PageBuilder[]) {
    const resourceNames = [...new Set(pages.map((x) => x.endpoint.resourceName))]
    return resourceNames.map((x) => new PageGroup(x, pages))
  }
}
