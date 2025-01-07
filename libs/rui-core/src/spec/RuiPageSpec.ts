import { RuiAnyActionSpec } from './actions/RuiAnyActionSpec.js'
import { RuiApiActionSpec } from './actions/RuiApiActionSpec.js'
import { RuiCompositeActionSpec } from './actions/RuiCompositeActionSpec.js'
import { RuiRedirectActionSpec } from './actions/RuiRedirectActionSpec.js'
import { RuiFieldSpec } from './RuiFieldSpec.js'
import { RuiPageType } from './RuiPageType.js'

export interface RuiPageSpec {
  route: string
  type: RuiPageType

  dataSource?: RuiApiActionSpec

  onSubmit?: RuiApiActionSpec | RuiCompositeActionSpec

  fields: RuiFieldSpec[]

  actions?: RuiAnyActionSpec[]

  viewLink?: RuiRedirectActionSpec

  editLink?: RuiRedirectActionSpec

  displayName?: string
}
