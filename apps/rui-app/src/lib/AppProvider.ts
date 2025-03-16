import { RuiApp } from 'rui-core/app';
import {
  OpenAPISpec,
  PageBuilder,
  StamdataDocument,
  TestDocument1,
} from 'rui-generator';
import { nextAppOptions, ReactRuiComponent } from 'rui-react-config';

const testApi = new OpenAPISpec(TestDocument1);
const testApp = new RuiApp(
  {
    id: 'test',
    name: 'test',
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
    id: 'stamdata',
    name: 'stamdata',
    baseUrl: 'https://api2.ski.dk/stamdata/v1',
    pages: stamdataApi.operations
      .filter((x) => !['DELETE', 'PATCH', 'OPTIONS'].includes(x.method))
      .map((x) => new PageBuilder(x, stamdataApi, {}).build()),
  },
  nextAppOptions
);
class AppProvider {
  _app: RuiApp<ReactRuiComponent>;
  constructor() {
    this._app = stamdataApp;
  }
  get app() {
    return this._app;
  }
}

const defaultAppProvider = new AppProvider();
export default defaultAppProvider;
