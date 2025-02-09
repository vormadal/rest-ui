'use client';

import { nextAppOptions } from '../lib/AppOptions';
import { ApiBuilder } from '../core/generator/ApiBuilder';
import { TestDocument1 } from '../samples/test';
import { RuiApp } from '../core/app/RuiApp';
import { PageBuilder } from '../core/generator/PageBuilder';
import { ApiBuilderContext } from '../core/generator/context/ApiBuilderContext';

const api = new ApiBuilder(TestDocument1).build();
const page = new PageBuilder(api[0], new ApiBuilderContext(TestDocument1)).spec;

const app = new RuiApp(
  {
    baseUrl: 'http://localhost:5093',
    api: api,
    pages: [page],
  },
  nextAppOptions
);

interface Props {
  children: React.ReactNode;
}
// export default function AppProvider({ children }: Props) {
//   return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
// }
