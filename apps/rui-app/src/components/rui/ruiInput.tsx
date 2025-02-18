// text field component based on input component
import * as React from 'react';
import { Input, Label } from '@ui';
import { cn } from '../../lib/utils';

export interface RuiInputProps {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  value?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextField: React.FC<RuiInputProps> = ({
  type,
  name,
  label,
  value,
  defaultValue,
  onChange,
}) => {
  return (
    <div className={cn('w-full pb-2')}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={label}
      />
    </div>
  );
};

export default TextField;
