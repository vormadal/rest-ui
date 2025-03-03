import { createContext, useContext } from 'react';
import { ComponentSpecValues } from 'rui-core';

type ComponentOptionsContextType = ComponentSpecValues;
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
