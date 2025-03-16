import { ComponentConfiguration } from 'rui-core';
import ActionBar from '../components/ActionBar';
import ActionBarButton from '../components/ActionBarButton';
import DefaultCheckbox from '../components/DefaultCheckboxField';
import DefaultDateTimeField from '../components/DefaultDateTimeField';
import DefaultTable from '../components/DefaultTable';
import DefaultTextField from '../components/DefaultTextField';
import FallbackComponent from '../components/FallbackComponent';
import { ReactRuiComponent } from './ReactRuiComponent';

class ComponentLibrary {
  private readonly _components: ComponentConfiguration<ReactRuiComponent>[] =
    [];

  constructor() {
    this._components = [
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
