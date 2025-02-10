import { JsonValueSpec } from './JsonValueSpec';
import { PathValueSpec } from './PathValueSpec';
import { QueryValueSpec } from './QueryValueSpec';

export type DataValueSpec = JsonValueSpec | PathValueSpec | QueryValueSpec;
