import type { DuiActionOptions } from './DuiActionOptions'
import type { DuiApiActionOptions } from './DuiApiActionOptions'
import type { DuiCompositeActionOptions } from './DuiCompositeActionOptions'
import type { DuiRedirectActionOptions } from './DuiRedirectActionOptions'

/**
 * To make configuration simple using json only we cannot simply use inheritance,
 * but we need to be more explicit about which possible values exists
 */
export type DuiActionOptionsValues =
  | DuiActionOptions
  | DuiApiActionOptions
  | DuiCompositeActionOptions
  | DuiRedirectActionOptions
