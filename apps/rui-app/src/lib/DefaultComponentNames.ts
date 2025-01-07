class FieldComponentNames {
  static readonly Read_Default = 'read:default'
  static readonly Write_Default = 'write:default'
  static readonly Read_TableCell = 'read:table-cell'
  static readonly Write_TableCell = 'write:table-cell'

  static readonly All = [
    FieldComponentNames.Read_Default,
    FieldComponentNames.Write_Default,
    FieldComponentNames.Read_TableCell,
    FieldComponentNames.Write_TableCell
  ]
}

class PageComponentNames {
  static readonly Default = 'default'
}
export { FieldComponentNames, PageComponentNames }
