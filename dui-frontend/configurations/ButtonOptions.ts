export interface ButtonOptions {
  linkTo: string
  parameters: DuiParameter[]
}

export interface DuiParameter {
  name: string

  from?: 'data' | 'path' | 'query'
  fieldName: string
}
