/**
 * Each component needs a configuration object to be registered with the ComponentLibrary.
 *
 */
export interface ComponentConfiguration<ComponentType> {
  name: string;
  // optional aliases for the component to use the same component for multiple names
  alias?: string[];
  component: ComponentType;
  options: ComponentOption[];
}

export interface ComponentOption {
  name: string;
  type: 'string' | 'number' | 'boolean';
}
