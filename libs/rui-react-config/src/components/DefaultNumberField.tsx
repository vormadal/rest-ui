// text field component based on input component
import * as React from 'react';
import { RuiField } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';
import RuiInput from './ruiInput';

export default function DefaultNumberField({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const value = config.getFieldValue<number>(
    context.data,
    'dataSource',
    config.fieldName
  );
  return (
    <RuiInput
      type={'number'}
      defaultValue={`${value}` || ''}
      name={config.fieldName}
      label={config.displayName}
    />
  );
}
