import { RuiApp } from 'rui-core/app';
import { OpenAPISpec, PageBuilder, TestDocument1 } from 'rui-generator';
import { nextAppOptions } from 'rui-react-config';

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
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="container mx-auto bg-red-400">
      <h1 className="text-6xl font-bold text-center bg-red-50">Editor</h1>
    </div>
  );
}
