import { NavigationMenu, NavigationMenuList } from '@ui';
import { ComponentProps } from '../../lib/ComponentProps';

export default function PageActionMenu({ children }: ComponentProps) {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>{children}</NavigationMenuList>
    </NavigationMenu>
  );
}
