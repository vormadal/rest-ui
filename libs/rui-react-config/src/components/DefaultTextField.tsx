// text field component based on input component
import { ComponentConfiguration } from 'rui-core';
import { RuiField } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';
import { ReactRuiComponent } from '../lib/ReactRuiComponent';
import RuiInput from './ruiInput';

function DefaultTextFieldComponent({ context }: ComponentProps) {
  const config = context.config as RuiField<ReactRuiComponent>;
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

const DefaultTextField: ComponentConfiguration<ReactRuiComponent> = {
  component: DefaultTextFieldComponent,
  name: 'field:string:default',
  alias: ['field:integer:int32', 'field:number:double'],
  options: [
    {
      name: 'label',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'dataSource',
      type: 'string',
    },
  ],
};

export default DefaultTextField;
