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
  const priority = config.getOption<number>('priority') || 0;
  
  return (
    <NavigationMenu>
      <NavigationMenuItem 
        onClick={() => config.exec(context)}
        style={{ order: priority }} // Use priority for ordering
      >
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
    optionEditorFactory.string('label'),
    optionEditorFactory.number('priority', { min: 0, max: 100, step: 1 })
  ],
};

export default ActionBarButton;
