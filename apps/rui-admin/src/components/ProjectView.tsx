'use client';

import Link from 'next/link';
import { RuiAppSpec } from 'rui-core';

type Props = {
  apps: RuiAppSpec[];
};
export default function ProjectView({ apps }: Props) {
  return (
    <div className='pt-4 pb-4'>
      <p>Continue with...</p>
      {apps.map((app) => (
        <div key={app.id} className="shadow-lg">
          <Link className='flex w-full h-full px-4 py-6 hover:bg-secondary' href={`/editor/${app.id}`}>{app.name}</Link>
        </div>
      ))}
    </div>
  );
}
