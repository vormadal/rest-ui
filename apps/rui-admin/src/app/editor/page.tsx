'use client';
import { RuiApp } from 'rui-core/app';
import { OpenAPISpec, PageBuilder, TestDocument1 } from 'rui-generator';
import { nextAppOptions } from 'rui-react-config';
import { EditorComponentWrapper } from '../../components/EditorComponentWrapper';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from '@ui';
import { useContext, useState } from 'react';
import { ComponentSpecValues } from 'rui-core';
import { ComponentOptionsContext } from '../../context/ComponentOptionsContext';

export default function Index() {
  const [componentOptions, setComponentOptions] =
    useState<ComponentSpecValues | null>(null);
  const testApi = new OpenAPISpec(TestDocument1);
  const testApp = new RuiApp(
    {
      baseUrl: 'http://localhost:5093',
      pages: testApi.operations
        .filter((x) => !['DELETE', 'PATCH', 'OPTIONS'].includes(x.method))
        .map((x) => new PageBuilder(x, testApi, {}).build()),
    },
    nextAppOptions
  );

  return (
    <>
      <ComponentOptionsContext.Provider
        value={[componentOptions, setComponentOptions]}
      >
        <EditorComponentWrapper
          appSpec={testApp.spec}
          componentSpec={testApp.pages[0].spec}
          app={testApp}
          componentConfig={testApp.pages[0]}
          priority={500}
        />
        <Drawer
          modal={false}
          open={!!componentOptions}
          onClose={() => setComponentOptions(null)}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>

              <DrawerDescription>
                <p>Type: {componentOptions?.type}</p>
                <p>Component: {componentOptions?.componentName}</p>
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
      </ComponentOptionsContext.Provider>
    </>
  );
}
