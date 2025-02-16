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
import { RuiField } from '../../core/app/fields/RuiField';
import { ComponentProps } from '../../lib/ComponentProps';
import { extractField } from '../../lib/utils';

// a component for viewing a string and a component to edit a string

export default function DefaultTable({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;

  const rows = extractField<unknown[]>(
    context.data[config.getOption<string>('dataSource')],
    config.getOption<string>('dataField')
  ).get();
  //TODO get formatter, maybe the columns should have their own components? ?
  const columns = config
    .getOption<
      {
        name: string;
        displayName: string;
        formatter?: string;
        formatterOptions?: unknown;
      }[]
    >('columns')
    .map((x) => ({
      ...x,
      format:
        context.app.getFormatter(x.formatter) ||
        ((value): string => value?.toString() ?? ''),
    }));
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
                  {field.format(
                    extractField<string>(row, field.name).get(),
                    field.formatterOptions
                  )}
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
