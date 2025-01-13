import { RuiPageType } from 'rui-core'
import { HttpMethods } from './openApi/HttpMethods'
import type { PageBuilder } from './PageBuilder'

export class PageGroup {
  create?: PageBuilder
  list?: PageBuilder
  update?: PageBuilder
  record?: PageBuilder
  delete?: PageBuilder

  constructor(public readonly name: string, pages: PageBuilder[]) {
    this.create = pages.find((x) => x.endpoint.resourceName === name && x.pageType === RuiPageType.create)
    this.list = pages.find((x) => x.endpoint.resourceName === name && x.pageType === RuiPageType.list)
    this.record = pages.find((x) => x.endpoint.resourceName === name && x.pageType === RuiPageType.view)
    this.update = pages.find((x) => x.endpoint.resourceName === name && x.pageType === RuiPageType.edit)
    this.delete = pages.find((x) => x.endpoint.resourceName === name && x.endpoint.method === HttpMethods.DELETE)
  }
}
