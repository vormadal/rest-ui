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
import { Scroll, Settings } from 'lucide-react';
import { RuiAppSpec, RuiPageSpec } from 'rui-core';
import { usePage } from '../context/PageContext';
import AppSettingsDialog from './AppSettingsDialog';

type Props = {
  children: React.ReactNode;
  app?: RuiAppSpec;
};
export default function EditorSidebar({ children, app }: Props) {
  const [, setPage] = usePage();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Rest UI</SidebarHeader>
        <SidebarContent>
          {!app && <div>Loading...</div>}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {(app?.pages || []).map((p) => (
                  <SidebarMenuItem key={p.id}>
                    <SidebarMenuButton onClick={() => setPage(p)}>
                      <Scroll />
                      <span>{p.route.template}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <AppSettingsDialog app={app}>
                    <SidebarMenuButton>
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </AppSettingsDialog>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
      <main>{children}</main>
    </SidebarProvider>
  );
}
