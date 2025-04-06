import { RuiAppSpec } from 'rui-core';
import { OpenAPISpec, PageBuilder } from 'rui-generator';
import { v7 as uuid } from 'uuid';
import {
  AppRepository,
  ComponentRepository,
  PageRepository,
} from 'rui-database';

const appRepository = AppRepository.getInstance();
const pageRepository = PageRepository.getInstance();
const componentRepository = ComponentRepository.getInstance();

export async function GET(request: Request) {
  const apps = await appRepository.getAll();

  return Response.json(apps);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.url) {
    return Response.json({ error: 'No URL provided' }, { status: 400 });
  }

  const apiDocument = await fetch(body.url).then((x) => x.json());
  const apiSpec = new OpenAPISpec(apiDocument);
  const appSpec: RuiAppSpec = {
    baseUrl: apiSpec.baseUrl,
    apis: [
      {
        name: apiSpec.name,
        document: apiDocument,
      },
    ],
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

async function createApp(app: RuiAppSpec) {
  const createdApp = await appRepository.createApp(app);

  for (const page of app.pages) {
    const createdPage = await pageRepository.createPage(page, createdApp.id);

    for (const component of page.components ?? []) {
      await componentRepository.createComponent(
        { ...component, pageId: createdPage.id },
        true
      );
    }
  }

  return createdApp;
}
