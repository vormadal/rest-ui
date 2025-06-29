import { NavigationMenu, NavigationMenuList } from '@ui';
import { ComponentProps } from '../lib/ComponentProps';
import { ComponentConfiguration } from 'rui-core';
import { FC } from 'react';

function ActionBarComponent({ children }: ComponentProps) {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>{children}</NavigationMenuList>
    </NavigationMenu>
  );
}

const ActionBar: ComponentConfiguration<FC<ComponentProps>> = {
  name: 'layout:action-bar:default',
  component: ActionBarComponent,
  options: [],
};

export default ActionBar;
