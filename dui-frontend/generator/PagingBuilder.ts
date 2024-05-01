import type { ParameterSchema } from './openApi/ParameterSchema'

export class PagingBuilder {
  constructor(
    public readonly pageSizeParameter: ParameterSchema,
    public readonly pageNumberParameter: ParameterSchema
  ) {}
}
