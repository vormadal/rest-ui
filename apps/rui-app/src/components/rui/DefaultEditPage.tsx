'use client'
import React from 'react'
import { ComponentProps } from '../../lib/ComponentProps'

export default function DefaultPage({ page, context, response }: ComponentProps) {
  const [data, setData] = React.useState(response.data)
  return (
    <>
      {page.fields.map((field) => (
        <field.Component
          key={field.name}
          field={field}
          context={context}
          page={page}
          response={response}
          data={data}
          handleChange={async (updated) => {
            setData({ ...(updated as object) })
          }}
        />
      ))}
    </>
  )
}
