import type { DuiConfig } from '../config/DuiConfig'
import type { DuiAction } from './DuiAction'

export interface ButtonAction extends DuiAction {
  label: string
}

export type DuiButtonAction<Config extends DuiConfig = DuiConfig> = ButtonAction & DuiAction<Config>
