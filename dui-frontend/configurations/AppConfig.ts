import { DuiApp } from '../dui-app/DuiApp'
import type { DuiAppOptions } from '../dui-app/DuiAppOptions'
import { DuiConfig, type IDuiConfig } from '../dui-app/config/DuiConfig'

export function createDuiApp<T extends IDuiConfig>(options: DuiAppOptions<T>): DuiApp {
  const config = new DuiConfig({})
  return new DuiApp<T>(options, config)
}
