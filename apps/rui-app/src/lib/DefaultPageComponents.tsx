import { FunctionComponent } from 'react';
import DefaultListPage from '../components/rui/DefaultListPage';
import { PageComponentNames } from './DefaultComponentNames';
import DefaultEditPage from '../components/rui/DefaultEditPage';
import { RuiPageType } from 'rui-core';

interface Type {
  names: string[];
  types: RuiPageType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FunctionComponent<any>;
}

const AllDataTypes: RuiPageType[] = [
  RuiPageType.create,
  RuiPageType.edit,
  RuiPageType.list,
  RuiPageType.view,
  RuiPageType.dashboard,
];
export const defaultPageComponents: Type[] = [
  {
    names: [PageComponentNames.Default],
    types: [RuiPageType.view, RuiPageType.edit],
    component: DefaultEditPage,
  },
  {
    //FIX: Catch all to avoid errors
    names: [PageComponentNames.Default],
    types: [...AllDataTypes],
    component: DefaultListPage,
  },
];
