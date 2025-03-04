import { createContext, FC, useContext } from 'react';

import { RuiPage } from 'rui-core/app';
import { ComponentProps } from 'rui-react-config';

type PageContextType = RuiPage<FC<ComponentProps>>;
export const PageContext = createContext<
  [PageContextType | null, (value: PageContextType | null) => void]
>([null, () => null]);

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};
