'use client';

import { cn } from '@ui/lib/utils';
import React, { useEffect } from 'react';
import { ComponentSpec } from 'rui-core';
import { useComponentOptions } from '../context/ComponentOptionsContext';
import { nextAppOptions } from '../../../../libs/rui-react-config/src';

export interface ComponentWrapperProps {
  spec: ComponentSpec;
  priority: number;
}

export function EditorComponentWrapper({
  spec,
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

  const componentConfig = nextAppOptions.getComponent(spec.name);
  const Component = componentConfig?.component;

  if (!Component)
    return (
      <p>
        missing component configuration: {spec.type}: {spec.name}
      </p>
    );

  return (
    <>
      {/* use this to add another component */}
      {/* <div className='w-full border-green-400 min-h-4 bg-green-400'></div> */}
      <div ref={componentRef}>
        <Component
          context={{
            config: nextAppOptions.getComponentConfiguration(
              spec,
              nextAppOptions
            ),
          }}
        >
          {(spec.components ?? []).map((child) => (
            <EditorComponentWrapper
              priority={priority + 1}
              key={child.id}
              spec={child}
            />
          ))}
        </Component>
      </div>
      <div
        onClick={() =>
          setOptions({
            spec: spec,
            options: componentConfig.options,
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
