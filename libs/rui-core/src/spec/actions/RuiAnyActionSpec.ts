import { RuiActionSpec } from './RuiActionSpec.js'
import { RuiApiActionSpec } from './RuiApiActionSpec.js'
import { RuiCompositeActionSpec } from './RuiCompositeActionSpec.js'
import { RuiRedirectActionSpec } from './RuiRedirectActionSpec.js'

/**
 * To make configuration simple using json only we cannot simply use inheritance,
 * but we need to be more explicit about which possible values exists
 */
export type RuiAnyActionSpec =
  | RuiActionSpec
  | RuiApiActionSpec
  | RuiCompositeActionSpec
  | RuiRedirectActionSpec
