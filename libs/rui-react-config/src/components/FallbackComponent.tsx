import { FC } from 'react';
import { ComponentConfiguration } from 'rui-core';
import { ComponentProps } from '../lib/ComponentProps';

function Fallback({ context }: ComponentProps) {
  return (
    <div>
      <h1>
        The component is not supported{' '}
        "{context.config?.componentSpec.componentName}"
      </h1>
    </div>
  );
}

const FallbackComponent: ComponentConfiguration<FC<ComponentProps>> = {
  name: 'error:default',
  component: Fallback,
  options: [],
};

export default FallbackComponent;
