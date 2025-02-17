import { RuiApp } from '../core/app/RuiApp';
import { OpenAPISpec, PageBuilder, GeneratorOptions } from 'rui-generator';
import { TestDocument1 } from '../samples/test';
import { nextAppOptions } from './AppOptions';
import { ComponentProps } from './ComponentProps';
import { StamdataDocument } from '../samples/stamdata';

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

const stamdataApi = new OpenAPISpec(StamdataDocument);
const stamdataApp = new RuiApp(
  {
    baseUrl: 'https://api2.ski.dk/stamdata/v1',
    pages: stamdataApi.operations
      .filter((x) => !['DELETE', 'PATCH', 'OPTIONS'].includes(x.method))
      .map((x) => new PageBuilder(x, stamdataApi, {}).build()),
  },
  nextAppOptions
);
class AppProvider {
  _app: RuiApp<React.FC<ComponentProps>>;
  constructor() {
    this._app = testApp;
  }
  get app() {
    return this._app;
  }
}

const defaultAppProvider = new AppProvider();
export default defaultAppProvider;
