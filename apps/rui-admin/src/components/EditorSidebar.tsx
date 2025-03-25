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
import { RuiPageSpec } from '../../../../libs/rui-core/src';
import { usePage } from '../context/PageContext';

type Props = {
  children: React.ReactNode;
  pages: RuiPageSpec[];
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
