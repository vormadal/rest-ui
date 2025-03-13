'use client';
import { ComponentConfiguration } from 'rui-core';
import { RuiPage } from 'rui-core/app';
import { ComponentProps } from '../lib/ComponentProps';
import { ReactRuiComponent } from '../lib/ReactRuiComponent';

function DefaultPageComponent({ context, children }: ComponentProps) {
  const config = context.config as RuiPage<ReactRuiComponent>;

  const title = config.getOption<string>('title');
  return (
    <>
      {title && <h1>{title}</h1>}
      {children}
    </>
  );
}

const DefaultPage: ComponentConfiguration<ReactRuiComponent> = {
  name: 'page:default',
  component: DefaultPageComponent,
  options: [
    { name: 'title', type: 'string' },
    { name: 'route', type: 'string' },
  ],
};
export default DefaultPage;
