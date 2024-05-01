export type ParserOptions = {
  request: {
    dataField?: string
  }
  response: {
    dataField?: string
  }
  pagingResponse: {
    dataField?: string
  }
  fieldsToHide: string[]
}
