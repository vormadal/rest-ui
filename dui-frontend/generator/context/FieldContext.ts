import type { PageBuilder } from '../PageBuilder'
import { PageContext } from './PageContext'

export class FieldContext extends PageContext {
  constructor(public readonly page: PageBuilder, public readonly fieldKey: string) {
    super(page.context.document, page.context.options)
    super.endpoints = page.context.endpoints
    super.pageGroups = page.context.pageGroups
  }
}
