'use client';

import { cn } from '@ui/lib/utils';
import React, { useEffect } from 'react';
import { Endpoint, RuiApp, RuiComponent } from 'rui-core/app';
import { ComponentProps, ReactRuiComponent } from 'rui-react-config';
import { useComponentOptions } from '../context/ComponentOptionsContext';

export interface ComponentWrapperProps {
  app: RuiApp<ReactRuiComponent>;
  component: RuiComponent<ReactRuiComponent>;
  priority: number;
}

export function EditorComponentWrapper({
  app,
  component,
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

  if (!component?.Component)
    return (
      <p>
        missing component configuration: {component.componentSpec.type}:{' '}
        {component.componentSpec.componentName}
      </p>
    );

  return (
    <>
      {/* use this to add another component */}
      {/* <div className='w-full border-green-400 min-h-4 bg-green-400'></div> */}
      <div ref={componentRef}>
        <component.Component
          context={{
            app,
            data: {},
            config: component,
            navigateTo: (path) => console.log('navigate to', path),
            route: 'editor',
            dataSources: component.dataSources.reduce<{
              [key: string]: Endpoint<ReactRuiComponent>;
            }>((map, source) => {
              map[source.name] = source;
              return map;
            }, {}),
          }}
        >
          {component.children.map((child, i) => (
            <EditorComponentWrapper
              priority={priority + 1}
              key={i}
              app={app}
              component={child}
            />
          ))}
        </component.Component>
      </div>
      <div
        onClick={() =>
          setOptions({
            value: component.componentSpec,
            fields: component.componentOptions,
          })
        }
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
