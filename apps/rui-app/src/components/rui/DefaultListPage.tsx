'use client'
import { PageProps } from '../../lib/PageProps'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@ui'

// a component for viewing a string and a component to edit a string

export default function DefaultListPage({ page, response, context }: PageProps) {
  const rows = Array.isArray(response.data) ? response.data : []
  return (
    <>
      <Table>
        <TableCaption>A list of data.</TableCaption>
        <TableHeader>
          <TableRow>
            {page.visibleFields.map((field) => (
              <TableHead key={field.name}>{field.displayName}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              onClick={() => page.viewLink?.run({ ...context, data: row })}
            >
              {page.visibleFields.map((field) => (
                <TableCell key={field.name}>
                  <field.Component
                    field={field}
                    response={response}
                    data={row}
                    page={page}
                    context={context}
                    handleChange={async (value) => console.log('value changed', field.name, value)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
