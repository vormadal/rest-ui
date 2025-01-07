'use client'
import React from 'react'
import { PageProps } from '../../lib/PageProps'

export default function DefaultPage({ page, context, response: data }: PageProps) {
  return (
    <>
      <h1>{page.route}</h1>
      {page.fields.map((field) => {
        const FieldComponent = field.Component
        return (
          <FieldComponent
            key={field.name}
            field={field}
            context={context}
            page={page}
            data={data}
            handleChange={async (value, field) => {
              console.log('handleChange', value, field)
            }}
          />
        )
      })}
    </>
  )
}
