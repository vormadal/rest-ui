import { Prisma, PrismaClient } from '@prisma/client';
import { GeneralOptionSpec, RuiPageSpec } from 'rui-core';
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
        route: {
          template: page.route.template,
          parameters: page.route.parameters.map((param) => ({
            name: param.name,
            type: param.type,
            in: param.in,
            required: param.required,
          })),
        } as Prisma.JsonObject,

        options: page.options as Prisma.JsonObject,
        appId: appId,
      })),
    });
  }

  async createPage(page: RuiPageSpec, appId: string) {
    const createdPage = await this.client.page.create({
      data: {
        name: page.name,
        route: {
          template: page.route.template,
          parameters: page.route.parameters.map((param) => ({
            name: param.name,
            type: param.type,
            in: param.in,
            required: param.required,
          })),
        },

        options: page.options as Prisma.JsonObject,
        app: {
          connect: { id: appId },
        },
      },
    });

    return this.toDto(createdPage);
  }

  async updatePage(pageId: string, data: {
    name?: string;
    showInMenu?: boolean;
    route?: {
      template: string;
      parameters: Array<{
        name: string;
        type: string;
        in: 'path' | 'query';
        required: boolean;
      }>
    }
  }) {
    console.log('Updating page', pageId, data);
    const updatedPage = await this.client.page.update({
      where: {
        id: pageId
      },
      data: {
        name: data.name,
        showInMenu: data.showInMenu,
        route: data.route ? {
          template: data.route.template,
          parameters: data.route.parameters.map((param) => ({
            name: param.name,
            type: param.type,
            in: param.in,
            required: param.required,
          }))
        } : undefined
      }
    });

    return this.toDto(updatedPage);
  }

  toDto(page: Prisma.PageGetPayload<true>): RuiPageSpec {
    return {
      id: page.id,
      type: 'page',
      // dataSources: page.dataSources,
      showInMenu: page.showInMenu ?? true,
      name: page.name,
      route: {
        template: page.route.template,
        parameters: page.route.parameters.map((param) => ({
          name: param.name,
          type: param.type,
          in: param.in as 'path' | 'query',
          required: param.required,
        })),
      },
      options: page.options as GeneralOptionSpec,
      components: [],
    };
  }
}
