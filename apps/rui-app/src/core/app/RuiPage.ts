import { RuiPageSpec } from 'rui-core';
import { RuiAppOptions } from './RuiApp';
import { RuiContext } from './RuiContext';
import { RuiDataMapping } from './RuiDataMapping';
import { RuiComponent } from './RuiComponent';

export class RuiPage<ComponentType> extends RuiComponent<ComponentType> {
  constructor(
    public readonly spec: RuiPageSpec,
    options: RuiAppOptions<ComponentType>
  ) {
    super(spec, options);
  }

  get route(): string {
    return this.spec.route;
  }

  get parameters() {
    const names = this.route
      .split('/')
      .filter((x) => !!x)
      .filter((x) => /\{.+\}/.test(x));

    return names.map((x) => ({ name: x, in: 'path' }));
  }

  matches = (context: RuiContext<ComponentType>): boolean => {
    const routeParts = context.route.split('/').filter((x) => !!x);
    const pageRouteParts = this.route.split('/').filter((x) => !!x);

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
    const templateParts = this.route.split('/').filter((x) => !!x);

    const templatePart = templateParts.find((x) => x === `{${param.source}}`);
    const index = templatePart ? templateParts.indexOf(templatePart) : -1;

    return index >= 0 ? routeParts[index] : '';
  };
}
