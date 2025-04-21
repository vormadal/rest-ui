'use client';
import { useQuery } from '@tanstack/react-query';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from '@ui';
import { use, useState } from 'react';
import { RuiAppSpec, RuiPageSpec } from 'rui-core';
import { EditorPageWrapper } from '../../../components/EditorPageWrapper';
import EditorSidebar from '../../../components/EditorSidebar';
import { OptionsEditor } from '../../../components/optionsEditor/OptionsEditor';
import { PageSettingsDialog } from '../../../components/PageSettingsDialog';
import {
  ComponentOptionsContext,
  ComponentOptionsContextType,
} from '../../../context/ComponentOptionsContext';
import { PageContext } from '../../../context/PageContext';

function useApp(props: { id: string }) {
  const query = useQuery({
    queryKey: ['app', props.id],
    queryFn: async () => {
      const url = `/apps/${props.id}`;
      const res = await fetch(url);
      const body = await res.json();
      return body as RuiAppSpec;
    },
  });

  return [query.data, query] as const;
}

export default function Index({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [componentOptions, setComponentOptions] =
    useState<ComponentOptionsContextType | null>(null);
  const [app] = useApp({ id });
  const [page, setPage] = useState<RuiPageSpec | null>(null);

  return (
    <>
      <ComponentOptionsContext.Provider
        value={[componentOptions, setComponentOptions]}
      >
        <PageContext.Provider value={[page, setPage]}>
          <EditorSidebar app={app}>
            <Menubar>
              <MenubarMenu>
                <PageSettingsDialog key={page?.id} page={page}>
                  <MenubarTrigger>Page Settings</MenubarTrigger>
                </PageSettingsDialog>
              </MenubarMenu>
            </Menubar>
            {page && <EditorPageWrapper page={page} />}
            <Drawer
              modal={false}
              open={!!componentOptions}
              onClose={() => setComponentOptions(null)}
            >
              <DrawerOverlay asChild>
                <div className="hidden"></div>
              </DrawerOverlay>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{componentOptions?.spec.name}</DrawerTitle>
                  <DrawerDescription>
                    {componentOptions?.spec.id}
                  </DrawerDescription>

                  {componentOptions && page && (
                    <OptionsEditor
                      pageId={page.id}
                      componentOptions={componentOptions}
                    />
                  )}
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </EditorSidebar>
        </PageContext.Provider>
      </ComponentOptionsContext.Provider>
    </>
  );
}
