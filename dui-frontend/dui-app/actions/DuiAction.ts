import type { DuiConfig } from '../config/DuiConfig'
import type { DuiActionContext } from './DuiActionContext'

export interface DuiAction<Config extends DuiConfig = DuiConfig> {
  //TODO type and maybe multiple steps? right now everything is just links

  run(context: DuiActionContext): Promise<any>
}
