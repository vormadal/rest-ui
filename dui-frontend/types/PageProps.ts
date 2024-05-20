import type { DuiActionContext } from '../dui-app/actions/DuiActionContext'
import type { DuiField } from '../dui-app/DuiField'

export type PageProps = {
  fetch: () => Promise<any[]>
  fields: DuiField[]
  context: DuiActionContext
}
