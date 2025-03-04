'use client';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle
} from '@ui';
import { FC, useState } from 'react';
import { ComponentSpecValues } from 'rui-core';
import { RuiApp, RuiPage } from 'rui-core/app';
import { OpenAPISpec, PageBuilder, TestDocument1 } from 'rui-generator';
import { ComponentProps, nextAppOptions } from 'rui-react-config';
import { EditorComponentWrapper } from '../../components/EditorComponentWrapper';
import EditorSidebar from '../../components/EditorSidebar';
import { ComponentOptionsContext } from '../../context/ComponentOptionsContext';
import { PageContext } from '../../context/PageContext';

export default function Index() {
  const [componentOptions, setComponentOptions] =
    useState<ComponentSpecValues | null>(null);
  const [page, setPage] = useState<RuiPage<FC<ComponentProps>> | null>(null);

  const testApi = new OpenAPISpec(TestDocument1);
  const testApp = new RuiApp(
    {
      baseUrl: 'http://localhost:5093',
      pages: testApi.operations
        .filter((x) => !['delete', 'patch', 'options'].includes(x.method.toLowerCase()))
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
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>

                  <DrawerDescription>
                    Type: {componentOptions?.type}
                    <br />
                    Component: {componentOptions?.componentName}
                    <br />
                    {JSON.stringify(componentOptions)}
                  </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </EditorSidebar>
        </PageContext.Provider>
      </ComponentOptionsContext.Provider>
    </>
  );
}
