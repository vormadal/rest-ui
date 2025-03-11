import { createContext, useContext } from 'react';

import { RuiPage } from 'rui-core/app';
import { ReactRuiComponent } from 'rui-react-config';

type PageContextType = RuiPage<ReactRuiComponent>;
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
