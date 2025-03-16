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
import { FC } from 'react';
import { RuiPage } from 'rui-core/app';
import { ComponentProps } from 'rui-react-config';
import { usePage } from '../context/PageContext';

type Props = {
  children: React.ReactNode;
  pages: RuiPage<FC<ComponentProps>>[];
};
export default function EditorSidebar({ children, pages }: Props) {
  const [, setPage] = usePage();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Rest UI</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {pages.map((page) => (
                  <SidebarMenuItem key={page.id}>
                    <SidebarMenuButton onClick={() => setPage(page)}>
                      <Scroll />
                      <span>{page.route.template}</span>
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
