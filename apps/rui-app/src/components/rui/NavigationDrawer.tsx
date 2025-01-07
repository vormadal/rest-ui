import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from '@ui'
import { Scroll } from 'lucide-react'
import Link from 'next/link'
import { RuiAppSpec, RuiPageType } from 'rui-core'
import { RuiApp } from '../../core/app/RuiApp'
import { nextAppOptions } from '../../lib/AppOptions'

interface Props {
  spec: RuiAppSpec
  children: React.ReactNode
}
export default function NavigationDrawer({ spec, children }: Props) {
  const app = new RuiApp(spec, nextAppOptions)
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Rest UI</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {app.pages
                  .filter((x) => x.type === RuiPageType.list)
                  .map((page) => (
                    <SidebarMenuItem key={page.route}>
                      <SidebarMenuButton asChild>
                        <Link href={page.route}>
                          <Scroll />
                          <span>{page.displayName}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main>{children}</main>
    </SidebarProvider>
  )
}
