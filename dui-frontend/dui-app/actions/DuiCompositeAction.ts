import type { IDuiConfig } from '../config/DuiConfig'
import type { DuiAction } from './DuiAction'
import type { DuiActionContext } from './DuiActionContext'
import type { DuiCompositeActionOptions } from './DuiCompositeActionOptions'

export class DuiCompositeAction<Config extends IDuiConfig> implements DuiAction<Config> {
  actions: DuiAction<Config>[]

  _label?: string

  get label() {
    return this._label ?? ''
  }

  constructor({ actions, label }: DuiCompositeActionOptions<Config>, config: Config) {
    this._label = label
    this.actions = config.actionFactory(actions, config)
  }

  async run(context: DuiActionContext): Promise<any> {
    for (const action of this.actions) {
      const result = await action.run(context)
      //TODO inject result into context
    }
  }
}
