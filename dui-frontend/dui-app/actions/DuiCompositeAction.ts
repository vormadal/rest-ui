import type { DuiConfig } from '../config/DuiConfig'
import type { DuiAction } from './DuiAction'
import type { DuiActionContext } from './DuiActionContext'
import type { DuiCompositeActionOptions } from './DuiCompositeActionOptions'

export class DuiCompositeAction<Config extends DuiConfig = DuiConfig> implements DuiAction<Config> {
  actions: DuiAction[]

  constructor({ actions }: DuiCompositeActionOptions, config: Config) {
    this.actions = config.actionFactory(actions, config)
  }

  async run(context: DuiActionContext): Promise<any> {
    for (const action of this.actions) {
      const result = await action.run(context)
      //TODO inject result into context
    }
  }
}
