import { Prisma, PrismaClient } from '@prisma/client';
import { ComponentSpec, GeneralOptionSpec } from 'rui-core';
import { DatabaseClient } from './Client';

export type DbComponent = ComponentSpec & {
  pageId: string;
  parentId?: string;
};

export class ComponentRepository {
  private static instance: ComponentRepository;
  private client: PrismaClient;
  private constructor() {
    this.client = DatabaseClient.getInstance().getDatabase();
  }

  public static getInstance(): ComponentRepository {
    if (!ComponentRepository.instance) {
      ComponentRepository.instance = new ComponentRepository();
    }
    return ComponentRepository.instance;
  }

  async getComponents(pageId: string): Promise<DbComponent[]> {
    const components = await this.client.component.findMany({
      where: {
        pageId: pageId,
      },
    });

    return components.map(this.toDto);
  }

  async createComponent(component: DbComponent, createChildComponents = false) {
    const createdComponent = await this.client.component.create({
      data: {
        name: component.name,
        type: component.type,
        options: component.options as Prisma.JsonObject,
        page: {
          connect: { id: component.pageId },
        },
        parent: component.parentId
          ? {
              connect: { id: component.parentId },
            }
          : undefined,
      },
    });

    if (createChildComponents) {
      const childComponents = component.components ?? [];
      for (const child of childComponents) {
        await this.createComponent(
          {
            ...child,
            pageId: component.pageId,
            parentId: createdComponent.id,
          },
          true
        );
      }
    }
    return createdComponent;
  }

  async createComponents(components: DbComponent[]) {
    await this.client.component.createMany({
      data: components.map((component) => ({
        name: component.name,
        type: component.type,
        options: component.options as Prisma.JsonObject,
        pageId: component.pageId,
        parentId: component.parentId,
      })),
    });
  }

  toDto(component: Prisma.ComponentGetPayload<true>): DbComponent {
    return {
      id: component.id,
      pageId: component.pageId,
      parentId: component.parentId,
      name: component.name,
      type: component.type,
      options: component.options as GeneralOptionSpec,
    };
  }
}
