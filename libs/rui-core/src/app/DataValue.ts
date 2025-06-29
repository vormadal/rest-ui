import { RuiContext } from './RuiContext';

export abstract class DataValue<ComponentType> {
  constructor(protected readonly name: string) {}

  abstract get(context: RuiContext<ComponentType>): unknown;

  abstract set(context: RuiContext<ComponentType>, value: unknown): void;
}
