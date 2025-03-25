import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@ui';
import { ComponentConfiguration } from 'rui-core';
import { ActionComponent } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';
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
  options: [
    {
      name: 'label',
      type: 'string',
    },
  ],
};

export default ActionBarButton;
