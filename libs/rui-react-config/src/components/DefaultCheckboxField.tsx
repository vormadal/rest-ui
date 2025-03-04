import { Checkbox } from '@ui';
import { ComponentConfiguration } from 'rui-core';
import { RuiField } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';

function DefaultCheckboxComponent({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const value = config.getFieldValue<boolean>(
    context.data,
    'dataSource',
    config.fieldName
  );

  return (
    <div className="flex items-center space-x-2 pt-2 pb-2">
      <Checkbox id={config.fieldName} checked={value || false} />
      <label
        htmlFor={config.fieldName}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {config.displayName}
      </label>
    </div>
  );
}

const DefaultCheckbox: ComponentConfiguration<React.FC<ComponentProps>> = {
  component: DefaultCheckboxComponent,
  name: 'field:boolean:default',
  options: [
    {
      name: 'dataSource',
      type: 'string',
    },
  ],
};

export default DefaultCheckbox;
