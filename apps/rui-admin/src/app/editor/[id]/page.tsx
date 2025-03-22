'use client';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from '@ui';
import { use, useState } from 'react';
import { RuiApp, RuiPage } from 'rui-core/app';
import { nextAppOptions, ReactRuiComponent } from 'rui-react-config';
import EditorSidebar from '../../../components/EditorSidebar';
import {
  ComponentOptionsContext,
  ComponentOptionsContextType,
} from '../../../context/ComponentOptionsContext';
import { PageContext } from '../../../context/PageContext';
import { useQuery } from '@tanstack/react-query';
import { RuiAppSpec } from 'rui-core';
import { EditorComponentWrapper } from 'apps/rui-admin/src/components/EditorComponentWrapper';

function useApp(props: { id: string }) {
  const query = useQuery({
    queryKey: ['app', props.id],
    queryFn: async () => {
      const url = `/apps/${props.id}`;
      const res = await fetch(url);
      const body = await res.json();

      const app = new RuiApp(body, nextAppOptions);
      return app;
    },
  });

  return [query.data, query] as const;
}

export default function Index({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [componentOptions, setComponentOptions] =
    useState<ComponentOptionsContextType | null>(null);
  const [app] = useApp({ id });
  const [page, setPage] = useState<RuiPage<ReactRuiComponent> | null>(null);

  return (
    <>
      <ComponentOptionsContext.Provider
        value={[componentOptions, setComponentOptions]}
      >
        <PageContext.Provider value={[page, setPage]}>
          {/* {JSON.stringify(app)} */}
          <EditorSidebar pages={app?.pages ?? []}>
            {page && app && (
              <EditorComponentWrapper
                app={app}
                component={page.components[0]}
                priority={500}
              />
            )}
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
                  <DrawerTitle>{componentOptions?.value.name}</DrawerTitle>
                  <DrawerDescription>
                    {JSON.stringify(componentOptions?.value)}
                  </DrawerDescription>
                  {/* {componentOptions?.fields.map((field) => (
                    <RuiInput
                      key={field.name}
                      label={field.name}
                      type={field.type}
                      name={field.name}
                      defaultValue={
                        componentOptions.value.options[field.name] as string
                      }
                    />
                  ))} */}
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </EditorSidebar>
        </PageContext.Provider>
      </ComponentOptionsContext.Provider>
    </>
  );
}
