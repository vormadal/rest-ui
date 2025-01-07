import { RuiCompositeActionSpec } from 'rui-core'
import { RuiAppOptions } from '../RuiApp'
import { RuiAction, RuiActionResponse } from './RuiAction'
import { RuiActionContext } from './RuiActionContext'

export class RuiCompositeAction<PC, FC> implements RuiAction<PC, FC> {
  actions: RuiAction<PC, FC>[]

  _label?: string

  get label() {
    return this._label ?? ''
  }

  constructor({ actions, label }: RuiCompositeActionSpec, options: RuiAppOptions<PC, FC>) {
    this._label = label
    this.actions = actions.map((x) => options.getAction(x, options))
  }

  async run<T>(context: RuiActionContext<PC, FC>): Promise<RuiActionResponse<T>> {
    for (const action of this.actions) {
      await action.run(context)
      //TODO inject result into context
    }
    return {}
  }
}
