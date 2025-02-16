import { RuiApp } from '../core/app/RuiApp';
import { OpenAPISpec, PageBuilder, GeneratorOptions } from 'rui-generator';
import { TestDocument1 } from '../samples/test';
import { nextAppOptions } from './AppOptions';
import { ComponentProps } from './ComponentProps';

class AppProvider {
  _app: RuiApp<React.FC<ComponentProps>>;
  constructor() {
    const api = new OpenAPISpec(TestDocument1);
    const options: GeneratorOptions = {
      // listFieldName: 'data',
    };
    this._app = new RuiApp(
      {
        baseUrl: 'http://localhost:5093',
        pages: api.operations
          .filter((x) => !['DELETE', 'PATCH', 'OPTIONS'].includes(x.method))
          .map((x) => new PageBuilder(x, options).build()),
      },
      nextAppOptions
    );
  }
  get app() {
    return this._app;
  }
}

const defaultAppProvider = new AppProvider();
export default defaultAppProvider;
