import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@ui';
import { ComponentConfiguration } from 'rui-core';
import { ActionComponent } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';
import { optionEditorFactory } from 'rui-core/app';
import { ReactRuiComponent } from '../lib/ReactRuiComponent';

function ActionBarButtonComponent({ context }: ComponentProps) {
  const config = context.config as ActionComponent<ReactRuiComponent>;

  const label = config.getOption<string>('label');
  return (
    <NavigationMenu>
      <NavigationMenuItem onClick={() => config.exec(context)}>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {label}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

const ActionBarButton: ComponentConfiguration<ReactRuiComponent> = {
  name: 'action-bar:button:default',
  component: ActionBarButtonComponent,
  options: [optionEditorFactory.string('label')],
};

export default ActionBarButton;
