'use client';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from '@ui';
import { useState } from 'react';
import { RuiPage } from 'rui-core/app';
import { ReactRuiComponent } from 'rui-react-config';
import EditorSidebar from '../../components/EditorSidebar';
import {
  ComponentOptionsContext,
  ComponentOptionsContextType,
} from '../../context/ComponentOptionsContext';
import { PageContext } from '../../context/PageContext';

export default function Index() {
  const [componentOptions, setComponentOptions] =
    useState<ComponentOptionsContextType | null>(null);
  const [page, setPage] = useState<RuiPage<ReactRuiComponent> | null>(null);

  return (
    <>
      <ComponentOptionsContext.Provider
        value={[componentOptions, setComponentOptions]}
      >
        <PageContext.Provider value={[page, setPage]}>
          <EditorSidebar pages={[]}>
            {/* {page && (
              <EditorComponentWrapper
                app={testApp}
                component={page}
                priority={500}
              />
            )} */}
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
                  <DrawerTitle>
                    {componentOptions?.value.name}
                  </DrawerTitle>
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
