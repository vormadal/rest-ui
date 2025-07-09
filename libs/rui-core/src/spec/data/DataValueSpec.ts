import { JsonValueSpec } from './JsonValueSpec';
import { PathValueSpec } from './PathValueSpec';
import { QueryValueSpec } from './QueryValueSpec';
import { RequestBodyValueSpec } from './RequestBodyValueSpec';
import { ResponseBodyValueSpec } from './ResponseBodyValueSpec';

export type DataValueSpec =
  | JsonValueSpec
  | PathValueSpec
  | QueryValueSpec
  | FormDataValueSpec
  | RequestBodyValueSpec
  | ResponseBodyValueSpec;
