<template>
  <NuxtLayout>
    <NuxtPage />
    <!-- <v-app>
      <DuiPage v-for="page in app.pages" :page="page" />
    </v-app> -->
  </NuxtLayout>
</template>

<script setup lang="ts">
import { createServer } from 'miragejs';
import { createDuiApp } from './configurations/AppConfig';
import { DuiPageType } from './dui-app/DuiPageType';

const employeeData = [
  { "id": 1, "employee_name": "Tiger Nixon", "employee_salary": 320800, "employee_age": 61, "profile_image": "", "dateTime": new Date() },
  { "id": 2, "employee_name": "Garrett Winters", "employee_salary": 170750, "employee_age": 63, "profile_image": "" },
  { "id": 3, "employee_name": "Ashton Cox", "employee_salary": 86000, "employee_age": 66, "profile_image": "" },
  { "id": 4, "employee_name": "Cedric Kelly", "employee_salary": 433060, "employee_age": 22, "profile_image": "" },
  { "id": 5, "employee_name": "Airi Satou", "employee_salary": 162700, "employee_age": 33, "profile_image": "" },
  { "id": 6, "employee_name": "Brielle Williamson", "employee_salary": 372000, "employee_age": 61, "profile_image": "" },
  { "id": 7, "employee_name": "Herrod Chandler", "employee_salary": 137500, "employee_age": 59, "profile_image": "" },
  { "id": 8, "employee_name": "Rhona Davidson", "employee_salary": 327900, "employee_age": 55, "profile_image": "" },
  { "id": 9, "employee_name": "Colleen Hurst", "employee_salary": 205500, "employee_age": 39, "profile_image": "" },
  { "id": 10, "employee_name": "Sonya Frost", "employee_salary": 103600, "employee_age": 23, "profile_image": "" },
  { "id": 11, "employee_name": "Jena Gaines", "employee_salary": 90560, "employee_age": 30, "profile_image": "" },
  { "id": 12, "employee_name": "Quinn Flynn", "employee_salary": 342000, "employee_age": 22, "profile_image": "" },
  { "id": 13, "employee_name": "Charde Marshall", "employee_salary": 470600, "employee_age": 36, "profile_image": "" },
  { "id": 14, "employee_name": "Haley Kennedy", "employee_salary": 313500, "employee_age": 43, "profile_image": "" },
  { "id": 15, "employee_name": "Tatyana Fitzpatrick", "employee_salary": 385750, "employee_age": 19, "profile_image": "" },
  { "id": 16, "employee_name": "Michael Silva", "employee_salary": 198500, "employee_age": 66, "profile_image": "" },
  { "id": 17, "employee_name": "Paul Byrd", "employee_salary": 725000, "employee_age": 64, "profile_image": "" },
  { "id": 18, "employee_name": "Gloria Little", "employee_salary": 237500, "employee_age": 59, "profile_image": "" },
  { "id": 19, "employee_name": "Bradley Greer", "employee_salary": 132000, "employee_age": 41, "profile_image": "" },
  { "id": 20, "employee_name": "Dai Rios", "employee_salary": 217500, "employee_age": 35, "profile_image": "" },
  { "id": 21, "employee_name": "Jenette Caldwell", "employee_salary": 345000, "employee_age": 30, "profile_image": "" },
  { "id": 22, "employee_name": "Yuri Berry", "employee_salary": 675000, "employee_age": 40, "profile_image": "" },
  { "id": 23, "employee_name": "Caesar Vance", "employee_salary": 106450, "employee_age": 21, "profile_image": "" },
  { "id": 24, "employee_name": "Doris Wilder", "employee_salary": 85600, "employee_age": 23, "profile_image": "" }
]

createServer({
  routes() {
    this.urlPrefix = "https://dummy.restapiexample.com"
    this.namespace = "api/v1"
    this.get("employees", () => {
      return {
        "status": "success", "data": employeeData,
        "message": "Successfully! All records has been fetched."
      }
    })
    this.put("employee/*", (schema, request) => {
      console.log('updating', request.requestBody)
      return {
        "status": "success", "data": {
          ...JSON.parse(request.requestBody),
          id: 1
        },
        "message": "Successfully! All records has been fetched."
      }
    })
    this.post("employees", (schema, request) => {
      console.log('posted data', request.requestBody)
      return {
        "status": "success", "data": {
          ...JSON.parse(request.requestBody),
          id: 1
        },
        "message": "Successfully! All records has been fetched."
      }
    })
    for (const employee of employeeData) {
      this.get(`employee/${employee.id}`, () => {
        return {
          status: "success",
          data: employeeData.find(x => x.id === employee.id) || {}
        }
      })
    }

  }
})

const app = createDuiApp({
  baseUrl: "https://dummy.restapiexample.com/api/v1",
  dashboard: {
    pages: ['employees']
  },
  pages: [
    {
      route: 'employees',
      type: DuiPageType.list,
      fields: [
        {
          displayName: "ID",
          name: "id",
          type: "string",
          hidden: true
        },
        {
          displayName: "Name",
          name: "employee_name",
          type: "string"
        },
        {
          displayName: 'Salary',
          name: 'employee_salary',
          type: 'number',
        },
        {
          displayName: "Edit",
          name: "edit",
          type: 'button',
          options: {
            linkTo: "employee/{id}/edit",
            parameters: [{
              name: "id",
              fieldName: "id"
            }]

          }
        },
        {
          displayName: "Show",
          name: "show",
          type: 'button',
          options: {
            linkTo: "employee/{id}",
            parameters: [{
              name: "id",
              fieldName: "id"
            }]

          }
        }
      ],
      readDataFrom: {
        method: "GET",
        path: "/employees",
        dataField: "data"
      },
      actions: [
        {
          to: '/employees/create',
          label: 'Create'
        }
      ]
    },
    {
      route: "employee/{id}",
      type: DuiPageType.record,
      fields: [
        {
          displayName: "ID",
          name: "id",
          type: "string",
          hidden: true
        },
        {
          displayName: "Name",
          name: "employee_name",
          type: "string"
        },
        {
          displayName: 'Salary',
          name: 'employee_salary',
          type: 'number',
        }
      ],
      readDataFrom: {
        method: "GET",
        path: "employee/{id}",
        dataField: "data",
        paramaters: [{
          fieldName: 'id',
          name: 'id',
          from: 'path'
        }]
      }
    },
    {
      type: DuiPageType.createForm,
      route: "employees/create",
      submitDataTo: {
        method: 'POST',
        path: "employees"
      },
      postSubmit: [
        {
          label: "",
          to: "/employee/{id}",
          dataField: "data",
          parameters: [
            {
              fieldName: 'id',
              name: 'id',
            }
          ]
        }
      ],
      fields: [
        {
          displayName: "Name",
          name: "employee_name",
          type: "string"
        },
        {
          displayName: 'Salary',
          name: 'employee_salary',
          type: 'number',
        },
        {
          displayName: 'Birthday',
          name: 'dateTime',
          type: 'date'
        },
        {
          displayName: 'Date Time',
          name: 'dateTime',
          type: 'dateTime'
        },
        {
          displayName: 'Time',
          name: 'dateTime',
          type: 'time'
        }
      ]
    },
    {
      route: "employee/{id}/edit",
      type: DuiPageType.updateForm,
      submitDataTo: {
        method: 'PUT',
        path: "employee/{id}"
      },
      fields: [
        {
          displayName: "Name",
          name: "employee_name",
          type: "string"
        },
        {
          displayName: 'Salary',
          name: 'employee_salary',
          type: 'number',
        },
        {
          displayName: 'Birthday',
          name: 'dateTime',
          type: 'date'
        },
        {
          displayName: 'Date Time',
          name: 'dateTime',
          type: 'dateTime'
        },
        {
          displayName: 'Time',
          name: 'dateTime',
          type: 'time'
        }
      ],
      readDataFrom: {
        method: "GET",
        path: "employee/{id}",
        dataField: "data",
        paramaters: [{
          fieldName: 'id',
          name: 'id',
          from: 'path'
        }]
      }
    },
  ]
})

provide('dui-app', app)


// function renderValue<T extends ValueOption>(value: ValueType, config: FieldConfiguration<T>, app: AppConfig) {
//   if (isEmpty(value)) {
//     if (config.options.skipFormattingWhenEmpty) {
//       return config.options.emptyValue
//     }
//     value = config.options.emptyValue
//   }

//   switch (config.type) {
//     case 'string':
//       return app.valueFormatters.string.formatter(value as string, config.options);
//     case 'number':
//       return app.valueFormatters.number.formatter(value as number, config.options as NumberValueOptions)
//     case 'date':
//       return AppConfig.valueFormatters.date(value as Date, config)
//     case 'date-time':
//       return AppConfig.valueFormatters.dateTime(value as Date, config)
//     case 'time':
//       return AppConfig.valueFormatters.time(value as Date, config)
//   }

//   throw new Error(`Invalid value type '${value}'`)
// }
</script>