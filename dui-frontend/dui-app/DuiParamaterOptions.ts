

export type ParameterValueSource = 'data' | 'path' | 'query'
/**
 * A URL path or query paramater configuration which specifies where 
 * the value for the given parameter is retrieved from
 */
export interface DuiParameterOptions {
    /**
     * The name of the parameter
     */
    name: string

    /**
     * where the value for the parameter is retrieved from
     */
    from?: ParameterValueSource

    /**
     * specifies the field name of the data object of which the value is retrieved from.
     * Or the corresponding field in path or query.
     * If a nested value use dot annotation e.g. "field.nestedField"
     */
    valueFieldName: string
}