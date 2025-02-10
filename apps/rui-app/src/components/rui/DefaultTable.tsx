'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui';
import { use, useEffect, useState } from 'react';
import { RuiField } from '../../core/app/fields/RuiField';
import { ComponentProps } from '../../lib/ComponentProps';
import { extractField } from '../../lib/utils';

// a component for viewing a string and a component to edit a string

export default function DefaultTable({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;
  const [data, setData] = useState<unknown[]>([]);

  useEffect(() => {
    const datasourceName = config.getOption<string>('dataSource');
    const datasource = config.getDataSource(datasourceName);
    console.log('datasource', datasource);
    datasource?.fetch<unknown[]>(context).then((json) => setData(json));
  }, []);

  const rows = extractField<unknown[]>(
    data,
    config.getOption<string>('dataField')
  ).get();
  //TODO get formatter, maybe the columns should have their own components? ?
  const columns =
    config.getOption<{ name: string; displayName: string }[]>('columns');
  return (
    <>
      <Table>
        <TableCaption>A list of data.</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.name}>{column.displayName}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              // onClick={() => page.viewLink?.run({ ...context, data: row })}
            >
              {columns.map((field) => (
                <TableCell key={field.name}>
                  {extractField<string>(row, field.name).get().toString()}
                  {/* <field.Component
                    field={field}
                    response={response}
                    data={row}
                    page={page}
                    context={context}
                    handleChange={async (value) =>
                      console.log('value changed', field.name, value)
                    }
                  /> */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
