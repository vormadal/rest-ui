import React from 'react'
import { RuiActionContext } from '../core/app/actions/RuiActionContext'
import { RuiPage } from '../core/app/RuiPage'
import { FieldProps } from './FieldProps'
import { RuiActionResponse } from '../core/app/actions/RuiAction'

export interface PageProps {
  page: RuiPage<React.FC<PageProps>, React.FC<FieldProps>>
  context: RuiActionContext<React.FC<PageProps>, React.FC<FieldProps>>
  response: RuiActionResponse<unknown>
}
