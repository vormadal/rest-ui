// text field component based on input component
import { FieldProps } from '../../lib/FieldProps';
import { Checkbox } from '@ui';

export default function DefaultCheckboxField({
  field,
  data,
  handleChange,
}: FieldProps) {
  return (
    <div className="flex items-center space-x-2 pt-2 pb-2">
      <Checkbox
        id={field.name}
        checked={field.getRawValue<boolean>(data) || false}
        onCheckedChange={(checked) =>
          handleChange(field.setValue(data, checked))
        }
      />
      <label
        htmlFor={field.name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {field.displayName}
      </label>
    </div>
  );
}
