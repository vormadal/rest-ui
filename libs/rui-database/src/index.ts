import { Prisma, PrismaClient } from '@prisma/client';
import {
  ComponentSpec,
  DataValueSpec,
  GeneralOptionSpec,
  RuiAppSpec,
  RuiPageSpec,
} from 'rui-core';

const prisma = new PrismaClient();

export async function getAppComponents(appId: string): Promise<ComponentSpec[]>{
  const components = await prisma.component.findMany({
    where: {
      
    }
  })
}

export async function createApp(app: RuiAppSpec): Promise<RuiAppSpec> {
  const createdApp = await prisma.app.create({
    data: {
      name: app.name,
    },
  });

  const pages: RuiPageSpec[] = [];
  for (const page of app.pages) {
    const createdPage = await createPage(page, createdApp.id);
    for (const component of page.components) {
      await createComponent(component, createdPage.id);
    }
    pages.push({
      id: createdPage.id,
      name: createdPage.name,
      // showInMenu: createdPage.showInMenu,
      // dataSources: createdPage.dataSources,
      route: {
        parameters: createdPage.route.parameters.map((parameter) => ({
          source: parameter.source as DataValueSpec,
          target: parameter.target as DataValueSpec,
        })),
        template: createdPage.route.template,
      },
      options: createdPage.options as GeneralOptionSpec,
      components: page.components,
    });
  }

  return {
    baseUrl: 'test', //createdApp.baseUrl,
    id: createdApp.id,
    name: createdApp.name,
    pages: pages,
  };
}

export async function getAppList(): Promise<RuiAppSpec[]> {
  const apps = await prisma.app.findMany({
    include: {
      pages: {
        include: {
          components: true,
        },
      },
    },
  });

  return apps.map(MapApp);
}

export async function getApp(appId: string): Promise<RuiAppSpec> {
  const app = await prisma.app.findUnique({
    where: { id: appId },
    include: {
      pages: {
        include: {
          components: true,
        },
      },
    },
  });

  if (!app) throw new Error('App not found');

  return MapApp(app);
}

function MapApp(
  app: Prisma.AppGetPayload<{
    include: { pages: { include: { components: true } } };
  }>
): RuiAppSpec {
  return {
    id: app.id,
    name: app.name,
    baseUrl: 'test', //app.baseUrl,
    pages: app.pages.map((page) => ({
      id: page.id,
      name: page.name,
      options: page.options as GeneralOptionSpec,
      route: {
        template: page.route.template,
        parameters: page.route.parameters.map((parameter) => ({
          source: parameter.source as DataValueSpec,
          target: parameter.target as DataValueSpec,
        })),
      },
      components: page.components.map((component) => ({
        id: component.id,
        name: component.name,
        type: component.type,
        options: component.options as GeneralOptionSpec,
      })),
    })),
  };
}

async function createPage(page: RuiPageSpec, appId: string) {
  const createdPage = await prisma.page.create({
    data: {
      name: page.name,
      route: page.route,
      options: page.options as Prisma.JsonObject,
      app: {
        connect: { id: appId },
      },
    },
  });

  return createdPage;
}

async function createComponent(
  component: ComponentSpec,
  pageId: string,
  parentId: string = undefined
) {
  const createdComponent = await prisma.component.create({
    data: {
      name: component.name,
      type: component.type,
      options: component.options as Prisma.JsonObject,
      page: {
        connect: { id: pageId },
      },
      parent: parentId
        ? {
            connect: { id: parentId },
          }
        : undefined,
    },
  });

  for (const child of component.components || []) {
    await createComponent(child, pageId, createdComponent.id);
  }
  return createdComponent;
}
