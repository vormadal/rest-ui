'use client';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from '@ui';
import TextField from 'libs/rui-react-config/src/components/ruiInput';
import { useState } from 'react';
import { RuiApp, RuiPage } from 'rui-core/app';
import { OpenAPISpec, PageBuilder, TestDocument1 } from 'rui-generator';
import { nextAppOptions, ReactRuiComponent } from 'rui-react-config';
import { EditorComponentWrapper } from '../../components/EditorComponentWrapper';
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

  const testApi = new OpenAPISpec(TestDocument1);
  const testApp = new RuiApp(
    {
      baseUrl: 'http://localhost:5093',
      pages: testApi.operations
        .filter(
          (x) =>
            !['delete', 'patch', 'options'].includes(x.method.toLowerCase())
        )
        .map((x) => new PageBuilder(x, testApi, {}).build()),
    },
    nextAppOptions
  );

  return (
    <>
      <ComponentOptionsContext.Provider
        value={[componentOptions, setComponentOptions]}
      >
        <PageContext.Provider value={[page, setPage]}>
          <EditorSidebar pages={testApp.pages}>
            {page && (
              <EditorComponentWrapper
                app={testApp}
                component={page}
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
                  <DrawerTitle>
                    {componentOptions?.value.componentName}
                  </DrawerTitle>
                  <DrawerDescription>
                    {JSON.stringify(componentOptions?.value)}
                  </DrawerDescription>
                  {componentOptions?.fields.map((field) => (
                    <TextField
                      key={field.name}
                      label={field.name}
                      type={field.type}
                      name={field.name}
                      defaultValue={
                        componentOptions.value.options[field.name] as string
                      }
                    />
                  ))}
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </EditorSidebar>
        </PageContext.Provider>
      </ComponentOptionsContext.Provider>
    </>
  );
}
