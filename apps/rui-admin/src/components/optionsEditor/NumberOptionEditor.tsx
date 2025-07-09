import { NumberOptions } from 'rui-core/app';
import { Input, Label } from '@ui';
import { ComponentOption } from 'rui-core';

type Props = {
  option: ComponentOption;
  value?: number;
  onChange: (value: number) => void;
};

/**
 * NumberOptionEditor provides a numeric input field for component options.
 * Supports min, max, step, and required constraints through NumberOptions.
 */
export function NumberOptionEditor({ option, value, onChange }: Props) {
  const options = (option.options ?? {}) as NumberOptions;
  
  return (
    <div>
      <Label htmlFor={option.name}>{option.name}</Label>
      <Input
        id={option.name}
        type="number"
        name={option.name}
        required={options.required}
        min={options.min}
        max={options.max}
        step={options.step}
        defaultValue={value?.toString() || ''}
        onChange={(e) => {
          const numValue = parseFloat(e.target.value);
          if (!isNaN(numValue)) {
            onChange(numValue);
          }
        }}
      />
    </div>
  );
}
