import { RuiApp } from '../core/app/RuiApp';
import { ApiBuilder } from '../core/generator/ApiBuilder';
import { ApiBuilderContext } from '../core/generator/context/ApiBuilderContext';
import { GeneratorOptions } from '../core/generator/GeneratorOptions';
import { PageBuilder } from '../core/generator/PageBuilder';
import { TestDocument1 } from '../samples/test';
import { nextAppOptions } from './AppOptions';
import { ComponentProps } from './ComponentProps';

class AppProvider {
  _app: RuiApp<React.FC<ComponentProps>>;
  constructor() {
    const document = TestDocument1;
    const api = new ApiBuilder(document).build();
    const context = new ApiBuilderContext(document); //TODO remove this ?
    const options: GeneratorOptions = {
      // listFieldName: 'data',
      schemaResolver: context,
    };
    this._app = new RuiApp(
      {
        api,
        baseUrl: 'http://localhost:5093',
        pages: api
          .filter((x) => x.method !== 'DELETE')
          .map((x) => new PageBuilder(x, options).spec),
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
