import { ComponentOption } from '../ComponentConfiguration';

export type StringOptions = {
  required?: boolean;
};

class OptionEditorFactory {
  public string(name: string, options?: StringOptions) {
    return this.createOption(name, 'string', options);
  }

  private createOption<T>(
    name: string,
    type: ComponentOption['type'],
    options?: T
  ): ComponentOption {
    return {
      name,
      type,
      options,
    };
  }
}

export const optionEditorFactory = new OptionEditorFactory();
