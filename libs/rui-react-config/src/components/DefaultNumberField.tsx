// text field component based on input component
import { RuiField } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';
import { ReactRuiComponent } from '../lib/ReactRuiComponent';
import RuiInput from './ruiInput';

export default function DefaultNumberField({ context }: ComponentProps) {
  const config = context.config as RuiField<ReactRuiComponent>;

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
