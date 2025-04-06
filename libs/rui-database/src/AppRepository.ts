import { Prisma, PrismaClient } from '@prisma/client';
import {
  DataValueSpec,
  GeneralOptionSpec,
  RuiAppSpec,
  RuiPageSpec,
} from 'rui-core';
import { DatabaseClient } from './Client';

export class AppRepository {
  private static instance: AppRepository;
  private client: PrismaClient;
  private constructor() {
    this.client = DatabaseClient.getInstance().getDatabase();
  }

  public static getInstance(): AppRepository {
    if (!AppRepository.instance) {
      AppRepository.instance = new AppRepository();
    }
    return AppRepository.instance;
  }

  async getAll(): Promise<RuiAppSpec[]> {
    const apps = await this.client.app.findMany({
      include: {
        pages: true,
      },
    });

    return apps.map(this.toDto);
  }

  async getApp(appId: string): Promise<RuiAppSpec> {
    const app = await this.client.app.findUnique({
      where: { id: appId },
      include: {
        pages: true,
      },
    });

    if (!app) throw new Error('App not found');

    return this.toDto(app);
  }

  async createApp(app: RuiAppSpec): Promise<RuiAppSpec> {
    const createdApp = await this.client.app.create({
      data: {
        name: app.name,
        apis: app.apis.map((api) => ({
          name: api.name,
          document: JSON.stringify(api.document),
        })),
      },
    });

    return {
      baseUrl: 'test', //createdApp.baseUrl,
      id: createdApp.id,
      name: createdApp.name,
      apis: createdApp.apis.map((api) => ({
        name: api.name,
        document: JSON.parse(api.document),
      })),
      pages: [],
    };
  }

  async deleteApp(appId: string): Promise<void> {
    await this.client.app.delete({
      where: { id: appId },
    });
  }
  
  toDto(
    app: Prisma.AppGetPayload<{
      include: { pages: true };
    }>
  ): RuiAppSpec {
    return {
      id: app.id,
      name: app.name,
      baseUrl: 'test', //app.baseUrl,
      apis: app.apis.map((api) => ({
        name: api.name,
        document: JSON.parse(api.document),
      })),
      pages: app.pages.map((page) => ({
        id: page.id,
        type: 'page',
        name: page.name,
        options: page.options as GeneralOptionSpec,
        route: {
          template: page.route.template,
          parameters: page.route.parameters.map((parameter) => ({
            source: parameter.source as DataValueSpec,
            target: parameter.target as DataValueSpec,
          })),
        },
      })),
    };
  }
}
