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
  SidebarProvider,
} from '@ui';
import { Scroll } from 'lucide-react';
import Link from 'next/link';
import { RuiAppSpec } from 'rui-core';
import { RuiApp } from 'rui-core/app';
import { nextAppOptions } from 'rui-react-config';

interface Props {
  spec: RuiAppSpec;
  children: React.ReactNode;
}
export default function NavigationDrawer({ spec, children }: Props) {
  const app = new RuiApp(spec, nextAppOptions);
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Rest UI</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {app.pages
                  .filter((x) => x.showInMenu)
                  .map((page) => (
                    <SidebarMenuItem key={page.id}>
                      <SidebarMenuButton asChild>
                        <Link href={page.route.template}>
                          <Scroll />
                          <span>{page.route.template}</span>
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
  );
}
