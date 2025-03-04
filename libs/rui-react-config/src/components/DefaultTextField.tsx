// text field component based on input component
import React from 'react';
import { ComponentConfiguration } from 'rui-core';
import { RuiField } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';
import RuiInput from './ruiInput';

function DefaultTextFieldComponent({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;
  const value = config.getFieldValue<string>(
    context.data,
    'dataSource',
    config.fieldName
  );
  return (
    <RuiInput
      type={config.dataType}
      defaultValue={value || ''}
      name={config.fieldName}
      label={config.displayName}
    />
  );
}

const DefaultTextField: ComponentConfiguration<React.FC<ComponentProps>> = {
  component: DefaultTextFieldComponent,
  name: 'field:string:default',
  alias: ['field:integer:int32', 'field:number:double'],
  options: [
    {
      name: 'dataSource',
      type: 'string',
    },
  ],
};

export default DefaultTextField;
