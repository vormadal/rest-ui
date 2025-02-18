import { Checkbox } from '@ui';
import { ComponentProps } from '../../lib/ComponentProps';
import { RuiField } from '../../core/app/fields/RuiField';
import { extractField } from '../../lib/utils';

export default function DefaultCheckboxField({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const value = extractField<boolean>(
    context.data[config.getOption<string>('dataSource')],
    config.fieldName
  ).get();

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
