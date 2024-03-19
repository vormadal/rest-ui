import type { DuiConfig } from '../config/DuiConfig'
import type { DuiButtonAction } from './DuiButtonAction'
import { DuiRedirectAction } from './DuiRedirectAction'
import type { DuiRedirectButtonActionOptions } from './DuiRedirectButtonActionOptions'

export class DuiRedirectButtonAction<Config extends DuiConfig = DuiConfig>
  extends DuiRedirectAction
  implements DuiButtonAction<Config>
{
  label: string

  constructor({ label, ...options }: DuiRedirectButtonActionOptions<Config>) {
    super(options)
    this.label = label
  }
}
