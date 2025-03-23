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
import { RuiApp, RuiComponent, RuiPage } from 'rui-core/app';
import { nextAppOptions, ReactRuiComponent } from 'rui-react-config';
import EditorSidebar from '../../../components/EditorSidebar';
import {
  ComponentOptionsContext,
  ComponentOptionsContextType,
} from '../../../context/ComponentOptionsContext';
import { PageContext } from '../../../context/PageContext';
import { useQuery } from '@tanstack/react-query';
import { ComponentSpec, RuiAppSpec } from 'rui-core';
import { EditorComponentWrapper } from 'apps/rui-admin/src/components/EditorComponentWrapper';
import { EditorPageWrapper } from 'apps/rui-admin/src/components/EditorPageWrapper';

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

function useComponents(props: { appId: string }) {
  const query = useQuery({
    queryKey: ['app', props.appId, 'components'],
    queryFn: async () => {
      const url = `/apps/${props.appId}/components`;
      const res = await fetch(url);
      const body = await res.json();

      return (body as ComponentSpec[]).map(
        (x) => new RuiComponent(x, nextAppOptions)
      );
    },
  });
  return [query.data, query] as const;
}

export default function Index({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [componentOptions, setComponentOptions] =
    useState<ComponentOptionsContextType | null>(null);
  const [app] = useApp({ id });
  // const [components] = useComponents({ appId: id });
  const [page, setPage] = useState<RuiPage<ReactRuiComponent> | null>(null);

  return (
    <>
      <ComponentOptionsContext.Provider
        value={[componentOptions, setComponentOptions]}
      >
        <PageContext.Provider value={[page, setPage]}>
          <EditorSidebar pages={app?.pages ?? []}>
            {page && app && <EditorPageWrapper app={app} page={page} />}
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
