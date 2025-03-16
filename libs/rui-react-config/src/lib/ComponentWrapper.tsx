'use client';

import { useRouter } from 'next/navigation';
import { ComponentSpec, GeneralOptionSpec, RuiAppSpec } from 'rui-core';
import { RuiApp, RuiComponent } from 'rui-core/app';
import { nextAppOptions } from './NextAppOptions';
import { ReactRuiComponent } from './ReactRuiComponent';

export interface ComponentWrapperProps {
  app?: RuiApp<ReactRuiComponent>;
  appSpec: RuiAppSpec;
  componentSpec: ComponentSpec;
  componentConfig?: RuiComponent<ReactRuiComponent>;
  route: string;
  data: GeneralOptionSpec;
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
        {config.componentSpec.name}
      </p>
    );
  const appInstance = app || new RuiApp(appSpec, nextAppOptions);

  return (
    <config.Component
      context={{
        app: appInstance,
        data,
        config,
        navigateTo: (path) => router.push(path),
        route: route,
      }}
    >
      {config.children.map((child) => (
        <ComponentWrapper
          key={child.id}
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
