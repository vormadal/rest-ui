import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@ui';
import { ComponentProps } from '../lib/ComponentProps';
import { ActionComponent } from 'rui-core/app';
import { ComponentConfiguration } from 'rui-core';

function ActionBarButtonComponent({ context }: ComponentProps) {
  const config = context.config as ActionComponent<React.FC<ComponentProps>>;

  const label = config.getOption<string>('label');
  return (
    <NavigationMenuItem onClick={() => config.exec(context)}>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

const ActionBarButton: ComponentConfiguration<React.FC<ComponentProps>> = {
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
