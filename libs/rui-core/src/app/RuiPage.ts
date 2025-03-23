import { RouteSpec } from '../spec/RouteSpec';
import { RuiPageSpec } from '../spec/RuiPageSpec';
import { Endpoint } from './Endpoint';
import { RuiAppOptions } from './RuiApp';
import { RuiComponent } from './RuiComponent';
import { RuiContext } from './RuiContext';
import { RuiDataMapping } from './RuiDataMapping';

export class RuiPage<ComponentType> extends RuiComponent<ComponentType> {
  readonly dataSources: Endpoint<ComponentType>[];

  constructor(
    public readonly spec: RuiPageSpec,
    private readonly options: RuiAppOptions<ComponentType>
  ) {
    super(spec, options);
    this.dataSources =
      spec.dataSources?.map((x) => new Endpoint(x, options)) ?? [];
  }

  getDataSource(name: string): Endpoint<ComponentType> | undefined {
    return this.dataSources.find(
      (x) => x.id.toLowerCase() === name.toLowerCase()
    );
  }

  get route(): RouteSpec {
    return this.spec.route;
  }

  get showInMenu(): boolean {
    return !!this.spec.showInMenu;
  }

  get parameters() {
    const names = this.route.template
      .split('/')
      .filter((x) => !!x)
      .filter((x) => /\{.+\}/.test(x));

    return names.map((x) => ({ name: x, in: 'path' }));
  }

  matches = (context: RuiContext<ComponentType>): boolean => {
    const routeParts = context.route.split('/').filter((x) => !!x);
    const pageRouteParts = this.route.template.split('/').filter((x) => !!x);

    if (routeParts.length !== pageRouteParts.length) return false;

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i] === pageRouteParts[i]) {
        continue;
      }
      if (/\{.+\}/.test(pageRouteParts[i])) {
        continue;
      }
      return false;
    }

    return true;
  };

  //TODO this is probably not the best place for this
  getParam = (param: RuiDataMapping<ComponentType>, route: string): string => {
    const routeParts = route.split('/').filter((x) => !!x);
    const templateParts = this.route.template.split('/').filter((x) => !!x);

    const templatePart = templateParts.find((x) => x === `{${param.source}}`);
    const index = templatePart ? templateParts.indexOf(templatePart) : -1;

    return index >= 0 ? routeParts[index] : '';
  };
}
