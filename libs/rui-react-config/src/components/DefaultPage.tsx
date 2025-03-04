'use client';
import React from 'react';
import { ComponentProps } from '../lib/ComponentProps';
import { RuiPage } from 'rui-core/app';
import { ComponentConfiguration } from 'rui-core';

function DefaultPageComponent({ context, children }: ComponentProps) {
  const config = context.config as RuiPage<React.FC<ComponentProps>>;

  const title = config.getOption<string>('title');
  return (
    <>
      {title && <h1>{title}</h1>}
      {children}
    </>
  );
}

const DefaultPage: ComponentConfiguration<React.FC<ComponentProps>> = {
  name: 'page:default',
  component: DefaultPageComponent,
  options: [{ name: 'title', type: 'string' }],
};
export default DefaultPage;
