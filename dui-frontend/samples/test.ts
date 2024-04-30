import { OpenAPIV3 } from 'openapi-types'

export const TestDocument1: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'TestApi',
    version: '1.0'
  },
  servers: [
    {
      url: 'http://localhost:5093'
    }
  ],
  paths: {
    '/departments': {
      post: {
        tags: ['DepartmentEndpoints'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Department'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Department'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['DepartmentEndpoints'],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Department'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/departments/{id}': {
      get: {
        tags: ['DepartmentEndpoints'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Department'
                }
              }
            }
          }
        }
      },
      put: {
        tags: ['DepartmentEndpoints'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Department'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Department'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['DepartmentEndpoints'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK'
          }
        }
      }
    },
    '/employees': {
      post: {
        tags: ['EmployeeEndpoints'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Employee'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['EmployeeEndpoints'],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Employee'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/employees/{id}': {
      get: {
        tags: ['EmployeeEndpoints'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          }
        }
      },
      put: {
        tags: ['EmployeeEndpoints'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Employee'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['EmployeeEndpoints'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Department: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            nullable: true
          },
          department_Name: {
            type: 'string',
            nullable: true
          },
          created: {
            type: 'string',
            format: 'date-time'
          }
        },
        additionalProperties: false
      },
      Employee: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            nullable: true
          },
          employee_Name: {
            type: 'string',
            nullable: true
          },
          employee_Salary: {
            type: 'integer',
            format: 'int32'
          },
          created: {
            type: 'string',
            format: 'date-time'
          },
          isAdmin: {
            type: 'boolean'
          },
          departmentId: {
            type: 'string',
            nullable: true,
            readOnly: true
          }
        },
        additionalProperties: false
      }
    }
  }
}
