'use client';
import React from 'react';
import { ComponentProps } from '../lib/ComponentProps';
import { RuiPage } from 'rui-core/app';

export default function DefaultPage({ context, children }: ComponentProps) {
  const config = context.config as RuiPage<React.FC<ComponentProps>>;
  return (
    <>
      <h1>{config.route}</h1>
      {children}
    </>
  );
}
