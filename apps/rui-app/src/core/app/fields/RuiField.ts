import { RuiFieldSpec } from 'rui-core';
import { extractField } from '../../../lib/utils';

import { RuiAppOptions } from '../RuiApp';
import { RuiComponent } from '../RuiComponent';

export class RuiField<ComponentType> extends RuiComponent<ComponentType> {
  constructor(
    protected readonly spec: RuiFieldSpec,
    private readonly options: RuiAppOptions<ComponentType>
  ) {
    super(spec, options);
  }

  get name(): string {
    return this.spec.componentName;
  }

  get dataType(): string {
    return this.spec.dataType;
  }

  get fieldName(): string {
    return this.spec.fieldName;
  }

  get displayName(): string {
    return this.spec.displayName;
  }

  formatValue(data: unknown): string {
    const value = this.getRawValue(data);
    return this.formatValue(value);
  }

  getRawValue = <T>(data: unknown) => {
    if (!data) return null;
    return extractField<T>(data, this.name);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue = (data: unknown, value: any) => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data as any)[this.name] = value;
    }
    return data;
  };
}
