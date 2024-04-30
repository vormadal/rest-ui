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

  // get deleteAction(): DuiActionOptionsValues | null {
  //   if (!this.delete) {
  //     return null
  //   }

  //   return {
  //     type: 'composite',
  //     label: 'Delete',
  //     actions: [
  //       this.delete.endpoint.buildApiAction(),
  //       {
  //         type: 'redirect',
  //         urlTemplate: this.list?.route || '/'
  //       }
  //     ]
  //   }
  // }

  // get createPage(): DuiPageOptions<any> {
  //   return {
  //     type: DuiPageType.createForm,
  //     dataSource: this.create?.endpoint.datasourceAction,
  //     route: this.create?.route || 'unknown',
  //     onSubmit: this.create?.endpoint.submitAction,
  //     fields: []
  //   }
  // }
}
