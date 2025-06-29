import { RuiApiActionSpec } from './RuiApiActionSpec';
import { RuiCompositeActionSpec } from './RuiCompositeActionSpec';
import { RuiRedirectActionSpec } from './RuiRedirectActionSpec';

export type RuiActionSpec =
  | RuiApiActionSpec
  | RuiCompositeActionSpec
  | RuiRedirectActionSpec;
