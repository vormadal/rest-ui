import { OpenAPIV3 } from 'openapi-types'

export const TestDocument1: OpenAPIV3.Document = {
  "openapi": "3.0.1",
  "info": {
    "title": "TestApi",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "http://localhost:5093"
    }
  ],
  "paths": {
    "/employees": {
      "get": {
        "tags": [
          "EmployeeEndpoints"
        ],
        "operationId": "GetEmployees",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Employee"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/employees/{id}": {
      "get": {
        "tags": [
          "EmployeeEndpoints"
        ],
        "operationId": "GetEmployeeById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Employee"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "EmployeeEndpoints"
        ],
        "operationId": "UpdateEmployee",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Employee"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Employee"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "EmployeeEndpoints"
        ],
        "operationId": "DeleteEmployee",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "style": "simple",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Employee": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "nullable": true
          },
          "employee_Name": {
            "type": "string",
            "nullable": true
          },
          "employee_Salary": {
            "type": "integer",
            "format": "int32"
          },
          "created": {
            "type": "string",
            "format": "date-time"
          },
          "isAdmin": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      }
    }
  }
}