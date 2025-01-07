'use client'
import React from 'react'
import { PageProps } from '../../lib/PageProps'

export default function DefaultPage({ page, context, response }: PageProps) {
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
