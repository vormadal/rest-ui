import type { DuiConfig } from '../config/DuiConfig'
import { DuiApiAction } from './DuiApiAction'
import type { DuiApiButtonActionOptions } from './DuiApiButtonActionOptions'
import type { DuiButtonAction } from './DuiButtonAction'

export class DuiApiButtonAction<Config extends DuiConfig = DuiConfig>
  extends DuiApiAction<Config>
  implements DuiButtonAction<Config>
{
  label: string
  constructor({ label, ...options }: DuiApiButtonActionOptions) {
    super(options)
    this.label = label
  }
}
