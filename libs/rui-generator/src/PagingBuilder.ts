
export class PagingBuilder {
  constructor(
    public readonly pageSizeParameter: string,
    public readonly pageNumberParameter: string,
    public readonly totalItemCountField: string
  ) {}

  build() {
    return {
      pageNumberField: this.pageNumberParameter,
      pageSizeField: this.pageSizeParameter,
      totalItemCountField: this.totalItemCountField
    }
  }
}
