import { DuiPageType } from '../dui-app/DuiPageType'
import { HttpMethods } from './openApi/HttpMethods'
import type { PageBuilder } from './PageBuilder'

export class PageGroup {
  create?: PageBuilder
  list?: PageBuilder
  update?: PageBuilder
  record?: PageBuilder
  delete?: PageBuilder

  constructor(public readonly name: string, pages: PageBuilder[]) {
    this.create = pages.find((x) => x.endpoint.resourceName === name && x.pageType === DuiPageType.createForm)
    this.list = pages.find((x) => x.endpoint.resourceName === name && x.pageType === DuiPageType.list)
    this.record = pages.find((x) => x.endpoint.resourceName === name && x.pageType === DuiPageType.record)
    this.update = pages.find((x) => x.endpoint.resourceName === name && x.pageType === DuiPageType.updateForm)
    this.delete = pages.find((x) => x.endpoint.resourceName === name && x.endpoint.method === HttpMethods.DELETE)
  }
}
