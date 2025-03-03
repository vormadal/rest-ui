'use client';

import { cn } from '@ui/lib/utils';
import React, { useEffect } from 'react';
import { ComponentSpecValues, RuiAppSpec } from 'rui-core';
import { Endpoint, RuiApp, RuiComponent } from 'rui-core/app';
import { ComponentProps, nextAppOptions } from 'rui-react-config';
import { useComponentOptions } from '../context/ComponentOptionsContext';

export interface ComponentWrapperProps {
  app?: RuiApp<React.FC<ComponentProps>>;
  appSpec: RuiAppSpec;
  componentSpec: ComponentSpecValues;
  componentConfig?: RuiComponent<React.FC<ComponentProps>>;
  priority: number;
}

export function EditorComponentWrapper({
  app,
  appSpec,
  componentSpec,
  componentConfig,
  priority,
}: ComponentWrapperProps) {
  const componentRef = React.useRef(null);
  const [dimensions, setDimensions] = React.useState({
    x: 10,
    y: 10,
    height: 10,
    width: 10,
  });

  const [, setOptions] = useComponentOptions();
  useEffect(() => {
    const el = componentRef.current as unknown as HTMLElement;
    if (!el) return;
    setDimensions({
      x: el.offsetLeft,
      y: el.offsetTop,
      height: el.offsetHeight,
      width: el.offsetWidth,
    });
  }, [componentRef]);

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

  return (
    <>
      {/* use this to add another component */}
      {/* <div className='w-full border-green-400 min-h-4 bg-green-400'></div> */}
      <div ref={componentRef}>
        <config.Component
          context={{
            app: appInstance,
            data: {},
            config,
            navigateTo: (path) => console.log('navigate to', path),
            route: 'editor',
            dataSources: config.dataSources.reduce<{
              [key: string]: Endpoint<React.FC<ComponentProps>>;
            }>((map, source) => {
              map[source.name] = source;
              return map;
            }, {}),
          }}
        >
          {config.children.map((child, i) => (
            <EditorComponentWrapper
              priority={priority + 1}
              key={i}
              appSpec={appSpec}
              componentSpec={child.componentSpec}
              app={appInstance}
              componentConfig={child}
            />
          ))}
        </config.Component>
      </div>
      <div
        onClick={() => setOptions(componentSpec)}
        style={{
          top: dimensions.y,
          left: dimensions.x,
          height: dimensions.height,
          width: dimensions.width,
          zIndex: priority,
        }}
        className={cn('border-cyan-400 absolute hover:border-2')}
      ></div>
    </>
  );
}
