import { createContext, useContext } from 'react';
import { ComponentOption, ComponentSpecValues } from 'rui-core';

export type ComponentOptionsContextType = {
  value: ComponentSpecValues;
  fields: ComponentOption[];
};
export const ComponentOptionsContext = createContext<
  [
    ComponentOptionsContextType | null,
    (value: ComponentOptionsContextType | null) => void
  ]
>([null, () => null]);

export const useComponentOptions = () => {
  const context = useContext(ComponentOptionsContext);
  if (!context) {
    throw new Error(
      'useComponentOptions must be used within a ComponentOptionsProvider'
    );
  }
  return context;
};
