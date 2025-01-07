import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@ui'
import { RuiAction } from '../../core/app/actions/RuiAction'
import { RuiActionContext } from '../../core/app/actions/RuiActionContext'
import { FieldProps } from '../../lib/FieldProps'
import { PageProps } from '../../lib/PageProps'

interface Props {
  actions: RuiAction<React.FC<PageProps>, React.FC<FieldProps>>[]
  context: RuiActionContext<React.FC<PageProps>, React.FC<FieldProps>>
}

export default function PageActionMenu({ actions, context }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {(actions || []).map((action) => (
          <NavigationMenuItem
            key={action.label}
            onClick={() => action.run(context)}
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>{action.label}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
