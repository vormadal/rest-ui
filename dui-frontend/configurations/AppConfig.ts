import { DuiApp } from '../dui-app/DuiApp'
import type { DuiAppOptions } from '../dui-app/DuiAppOptions'
import { DuiConfig } from '../dui-app/config/DuiConfig'

export function createDuiApp(options: DuiAppOptions): DuiApp {
  const config = new DuiConfig({})
  return new DuiApp(options, config)
}
