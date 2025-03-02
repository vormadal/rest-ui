'use client';

import { useRouter } from 'next/navigation';
import { ComponentSpecValues, RuiAppSpec } from 'rui-core';
import { Endpoint, RuiApp, RuiComponent } from 'rui-core/app';
import { ComponentProps } from './ComponentProps';
import { nextAppOptions } from './NextAppOptions';

export interface ComponentWrapperProps {
  app?: RuiApp<React.FC<ComponentProps>>;
  appSpec: RuiAppSpec;
  componentSpec: ComponentSpecValues;
  componentConfig?: RuiComponent<React.FC<ComponentProps>>;
  route: string;
  data: { [key: string]: unknown };
}

export function ComponentWrapper({
  app,
  route,
  appSpec,
  componentSpec,
  componentConfig,
  data,
}: ComponentWrapperProps) {
  const router = useRouter();

  const config =
    componentConfig ||
    nextAppOptions.getComponentConfiguration(componentSpec, nextAppOptions);

  if (!config?.Component)
    return (
      <p>
        missing component configuration: {config.componentSpec.type}:{' '}
        {config.componentSpec.componentName}
      </p>
    );
  const appInstance = app || new RuiApp(appSpec, nextAppOptions);

  for (const source of config.dataSources) {
    source.output = data[source.id];
  }

  return (
    <config.Component
      context={{
        app: appInstance,
        data,
        config,
        navigateTo: (path) => router.push(path),
        route: route,
        dataSources: config.dataSources.reduce<{
          [key: string]: Endpoint<React.FC<ComponentProps>>;
        }>((map, source) => {
          map[source.name] = source;
          return map;
        }, {}),
      }}
    >
      {config.children.map((child, i) => (
        <ComponentWrapper
          key={i}
          appSpec={appSpec}
          route={route}
          componentSpec={child.componentSpec}
          data={data}
          app={appInstance}
          componentConfig={child}
        />
      ))}
    </config.Component>
  );
}
