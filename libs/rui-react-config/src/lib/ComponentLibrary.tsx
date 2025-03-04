import React from 'react';
import { ComponentConfiguration } from 'rui-core';
import { ComponentProps } from './ComponentProps';
import DefaultPage from '../components/DefaultPage';
import FallbackComponent from '../components/FallbackComponent';
import ActionBar from '../components/ActionBar';
import ActionBarButton from '../components/ActionBarButton';
import DefaultTextField from '../components/DefaultTextField';
import DefaultCheckbox from '../components/DefaultCheckboxField';
import DefaultDateTimeField from '../components/DefaultDateTimeField';
import DefaultTable from '../components/DefaultTable';

class ComponentLibrary {
  private readonly _components: ComponentConfiguration<
    React.FC<ComponentProps>
  >[] = [];

  constructor() {
    this._components = [
      DefaultPage,
      ActionBar,
      ActionBarButton,
      DefaultTextField,
      DefaultCheckbox,
      DefaultDateTimeField,
      DefaultTable,
    ];
  }
  getComponent(name: string) {
    return (
      this._components.find(
        (c) => c.name === name || c.alias?.includes(name)
      ) ?? FallbackComponent
    );
  }
}

const componentLibrary = new ComponentLibrary();

export default componentLibrary;
