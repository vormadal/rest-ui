import { ComponentOption } from '../ComponentConfiguration';

export type StringOptions = {
  required?: boolean;
};

export type NumberOptions = {
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
};

export type EndpointOptions = {
  required?: boolean;
  allowedMethods?: string[];
};

class OptionEditorFactory {
  public string(name: string, options?: StringOptions) {
    return this.createOption(name, 'string', options);
  }

  public number(name: string, options?: NumberOptions) {
    return this.createOption(name, 'number', options);
  }

  public endpoint(name: string, options?: EndpointOptions) {
    return this.createOption(name, 'endpoint', options);
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
