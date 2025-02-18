// text field component based on input component
import * as React from 'react';
import RuiInput from './ruiInput';
import { ComponentProps } from '../../lib/ComponentProps';
import { RuiField } from '../../core/app/fields/RuiField';
import { extractField } from '../../lib/utils';

export default function DefaultNumberField({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const value = extractField<number>(
    context.data[config.getOption<string>('dataSource')],
    config.fieldName
  ).get();
  return (
    <RuiInput
      type={'number'}
      defaultValue={`${value}` || ''}
      name={config.fieldName}
      label={config.displayName}
    />
  );
}
