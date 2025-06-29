import { StringOptions } from 'rui-core/app';
import { Input, Label } from '@ui';
import { ComponentOption } from 'rui-core';

type Props = {
  option: ComponentOption;
  value?: string;
  onChange: (value: string) => void;
};

export function StringOptionEditor({ option, value, onChange }: Props) {
  const options = (option.options ?? {}) as StringOptions;
  return (
    <div>
      <Label htmlFor={option.name}>{option.name}</Label>
      <Input
        id={option.name}
        type="text"
        name={option.name}
        required={options.required}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
