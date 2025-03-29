import { Prisma, PrismaClient } from '@prisma/client';
import { DataValueSpec, GeneralOptionSpec, RuiPageSpec } from 'rui-core';
import { DatabaseClient } from './Client';

export class PageRepository {
  private static instance: PageRepository;
  private client: PrismaClient;
  private constructor() {
    this.client = DatabaseClient.getInstance().getDatabase();
  }

  public static getInstance(): PageRepository {
    if (!PageRepository.instance) {
      PageRepository.instance = new PageRepository();
    }
    return PageRepository.instance;
  }

  async createPages(pages: RuiPageSpec[], appId: string) {
    await this.client.page.createMany({
      data: pages.map((page) => ({
        name: page.name,
        route: page.route,
        options: page.options as Prisma.JsonObject,
        appId: appId,
      })),
    });
  }

  async createPage(page: RuiPageSpec, appId: string) {
    const createdPage = await this.client.page.create({
      data: {
        name: page.name,
        route: page.route,
        options: page.options as Prisma.JsonObject,
        app: {
          connect: { id: appId },
        },
      },
    });

    return this.toDto(createdPage);
  }

  toDto(page: Prisma.PageGetPayload<true>): RuiPageSpec {
    return {
      id: page.id,
      type: 'page',
      // dataSources: page.dataSources,
      // showInMenu: page.showInMenu,
      name: page.name,
      route: {
        template: page.route.template,
        parameters: page.route.parameters.map((x) => ({
          source: x.source as DataValueSpec,
          target: x.target as DataValueSpec,
        })),
      },
      options: page.options as GeneralOptionSpec,
      components: [],
    };
  }
}
