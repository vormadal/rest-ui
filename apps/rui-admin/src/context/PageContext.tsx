import { createContext, useContext } from 'react';

import { RuiPageSpec } from '../../../../libs/rui-core/src';

type PageContextType = RuiPageSpec;
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
