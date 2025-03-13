// text field component based on input component
import { Input, Label } from '@ui';
import * as React from 'react';

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
    <div className={'w-full pb-2'}>
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
