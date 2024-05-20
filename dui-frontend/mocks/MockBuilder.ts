import { OpenAPIV3 } from 'openapi-types'
import type { SchemaMap } from '../generator/openApi/SchemaMap'
import type { SchemaTypes } from '../generator/openApi/SchemaTypes'
import { faker } from '@faker-js/faker'

export class MockBuilder {
  constructor(public readonly document: OpenAPIV3.Document) {
    const map: SchemaMap = new Map()
    function resolveReferences(schemas: { [key: string]: SchemaTypes } | undefined, prefix: string) {
      const keys = Object.keys(schemas ?? {})
      if (!schemas) return
      for (const key of keys) {
        const schema = schemas[key]
        if (schema) {
          map.set(`${prefix}${key}`, schema)
        }
      }
    }

    resolveReferences(document?.components?.schemas, '#/components/schemas/')
    resolveReferences(document?.components?.requestBodies, '#/components/requestBodies/')
    resolveReferences(document?.components?.responses, '#/components/responses')

    this._schemas = map
  }

  private _schemas: SchemaMap

  get schemas(): SchemaMap {
    return this._schemas
  }

  resolveReference<T>(
    obj?: T | OpenAPIV3.ReferenceObject | OpenAPIV3.ResponsesObject | OpenAPIV3.ResponseObject | null
  ): T {
    if (!obj) throw new Error('reference is null')
    if ((obj as OpenAPIV3.ReferenceObject).$ref) {
      const ref = (obj as OpenAPIV3.ReferenceObject).$ref
      const component = this.schemas.get(ref)
      if ((component as OpenAPIV3.ReferenceObject).$ref) {
        return this.resolveReference<T>(component as OpenAPIV3.ReferenceObject)
      }
      return component as T
    }
    return obj as T
  }

  createMock(schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject, level: number = 0, name?: string) {
    schema = this.resolveReference<OpenAPIV3.SchemaObject>(schema)

    if (level > 3) {
      return null
    }
    if (schema.type === 'array') {
      return this.createMockArray(schema, level + 1)
    }
    if (schema.type === 'object') {
      return this.createMockObject(schema, level + 1)
    }
    return this.createMockField(schema, level + 1, name)
  }

  private createMockObject(schema: OpenAPIV3.NonArraySchemaObject, level: number) {
    let obj: any = {}
    for (const name of Object.keys(schema.properties || {})) {
      const property = schema.properties![name]
      obj[name] = this.createMock(property, level, name)
    }

    return obj
  }

  private createMockArray(schema: OpenAPIV3.ArraySchemaObject, level: number): any[] {
    let list: any[] = new Array(10).fill(1)

    return list.map((x) => this.createMock(schema.items, level))
  }

  private createMockField(schema: OpenAPIV3.NonArraySchemaObject, level: number, name?: string) {
    switch (schema.type) {
      case 'boolean':
        return Math.random() > 0.5
      case 'integer':
        switch (name) {
          case 'pageNumber':
            return faker.number.int({ min: 0, max: 10 })
          case 'pageSize':
            return 10
          case 'totalCount':
            return faker.number.int({ min: 200, max: 1000 })
          default:
            return faker.number.int({ min: 0, max: 10000 })
        }

      case 'number':
        return faker.number.float({ fractionDigits: 2 })
      case 'string':
        if (['date', 'date-time'].includes(schema.format || '')) {
          return faker.date.anytime()
        }
        if (name?.toLowerCase().endsWith('id')) {
          return faker.database.mongodbObjectId()
        }

        if (name?.toLowerCase().includes('name')) {
          return faker.company.name()
        }

        if (name?.toLowerCase().includes('type')) {
          return faker.color.human()
        }
        return faker.lorem.sentence(5)
    }
    return 'unknown'
  }
}
