

export interface ReferenceResolver {
    resolveReferenceObject<T>(
        components: SchemaComponentMap,
        obj?: T | OpenAPIV3.ReferenceObject //TODO
      ): T | null
}