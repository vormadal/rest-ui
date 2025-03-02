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
import { ComponentProps } from '../lib/ComponentProps';
import { RuiField } from 'rui-core/app';
import { extractField } from 'rui-core';

// a component for viewing a string and a component to edit a string

type ColumnType = {
  name: string;
  displayName: string;
  formatter?: string;
  formatterOptions?: unknown;
  format: (value: string, options?: unknown) => string;
};

type OnClickType = {
  urlTemplate: string;
  parameters: { name: string; source: 'row'; value: string }[];
};
export default function DefaultTable({ context }: ComponentProps) {
  const config = context.config as RuiField<React.FC<ComponentProps>>;
  const onClick = (_row: unknown) => {
    const onClick = config.getOption<OnClickType>('onClick');
    if (!onClick) return;
    let route = onClick?.urlTemplate;
    for (const parameter of onClick.parameters) {
      route = route.replace(
        `{${parameter.name}}`,
        extractField<string>(_row, parameter.value).get()
      );
    }
    context.navigateTo(route);
  };
  const rows = extractField<unknown[]>(
    context.data[config.getOption<string>('dataSource')],
    config.getOption<string>('dataField')
  ).get();
  //TODO get formatter, maybe the columns should have their own components? ?
  const columns = config.getOption<ColumnType[]>('columns').map((x) => ({
    ...x,
    format:
      context.app.getFormatter(x.formatter) ||
      ((value): string => value?.toString() ?? ''),
  }));
  return (
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
          <TableRow key={i} onClick={() => onClick(row)}>
            {columns.map((field) => (
              <TableCell key={field.name}>
                {field.format(
                  extractField<string>(row, field.name).get(),
                  field.formatterOptions
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
