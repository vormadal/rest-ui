import type { DuiActionContext } from './DuiActionContext'

export interface DuiAction {
  //TODO type and maybe multiple steps? right now everything is just links

  run(context: DuiActionContext): Promise<any>

  get label(): string
}
