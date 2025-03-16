'use client';

import Link from 'next/link';
import { RuiAppSpec } from 'rui-core';

type Props = {
  apps: RuiAppSpec[];
};
export default function ProjectView({ apps }: Props) {
  return (
    <>
      {apps.map((app) => (
        <Link href={`/editor/${app.id}`} key={app.id}>
          {app.name}
        </Link>
      ))}
    </>
  );
}
