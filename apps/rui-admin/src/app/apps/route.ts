import { RuiAppSpec } from 'rui-core';
import { createApp, getAppList } from 'rui-database';
import { OpenAPISpec, PageBuilder } from 'rui-generator';
import { v7 as uuid } from 'uuid';

export async function GET(request: Request) {
  const apps = await getAppList();

  return Response.json(apps);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.url) {
    return Response.json({ error: 'No URL provided' }, { status: 400 });
  }

  const apiSpec = new OpenAPISpec(await fetch(body.url).then((x) => x.json()));
  const appSpec: RuiAppSpec = {
    baseUrl: apiSpec.baseUrl,
    id: uuid(),
    name: apiSpec.name,
    pages: apiSpec.operations
      .filter(
        (x) => !['delete', 'patch', 'options'].includes(x.method.toLowerCase())
      )
      .map((x) => new PageBuilder(x, apiSpec, {}).build()),
  };

  try {
    const created = await createApp(appSpec);
    return Response.json(created);
  } catch (e) {
    console.log('failed to create app', e.stack);
    return Response.json({ error: 'failed' }, { status: 200 });
  }
}
