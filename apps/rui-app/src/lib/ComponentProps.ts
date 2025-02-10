import React from 'react';
import { RuiContext } from '../core/app/RuiContext';

export interface ComponentProps {
  context: RuiContext<React.FC<ComponentProps>>;
  children?: React.ReactNode;
}
