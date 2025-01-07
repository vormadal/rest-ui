import { RuiActionResponse } from '../core/app/actions/RuiAction'
import { RuiActionContext } from '../core/app/actions/RuiActionContext'
import { RuiField } from '../core/app/fields/RuiField'
import { RuiPage } from '../core/app/RuiPage'
import { PageProps } from './PageProps'

export interface FieldProps {
  field: RuiField<React.FC<PageProps>, React.FC<FieldProps>>
  page: RuiPage<React.FC<PageProps>, React.FC<FieldProps>>
  context: RuiActionContext<React.FC<PageProps>, React.FC<FieldProps>>
  response: RuiActionResponse<unknown>
  data: unknown
  handleChange: (updatedData: unknown) => Promise<void>
}
