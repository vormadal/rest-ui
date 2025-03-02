import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@ui';
import { ComponentProps } from '../lib/ComponentProps';
import { ActionComponent } from 'rui-core/app';

export default function ActionBarButton({ context }: ComponentProps) {
  const config = context.config as ActionComponent<React.FC<ComponentProps>>;

  return (
    <NavigationMenuItem
      key={config.spec.label}
      onClick={() => config.exec(context)}
    >
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {config.spec.label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
