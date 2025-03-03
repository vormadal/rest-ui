'use client';
import { RuiApp } from 'rui-core/app';
import { OpenAPISpec, PageBuilder, TestDocument1 } from 'rui-generator';
import { nextAppOptions } from 'rui-react-config';
import { EditorComponentWrapper } from '../../components/EditorComponentWrapper';

export default function Index() {
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
    <EditorComponentWrapper
      appSpec={testApp.spec}
      componentSpec={testApp.pages[0].spec}
      app={testApp}
      componentConfig={testApp.pages[0]}
    />
  );
}
