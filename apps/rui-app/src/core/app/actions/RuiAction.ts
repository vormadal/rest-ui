import { RuiActionContext } from './RuiActionContext'

export interface RuiAction<PC, FC> {
  run<T>(context: RuiActionContext<PC, FC>): Promise<RuiActionResponse<T>>

  get label(): string
}

export interface RuiActionResponse<T> {
  data?: T
  page?: number
  size?: number
  total?: number
}
