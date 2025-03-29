import { PrismaClient } from '@prisma/client';

export class DatabaseClient {
  private static instance: DatabaseClient;
  private client: PrismaClient;

  private constructor() {
    console.log('creating new prisma client...');
    this.client = new PrismaClient();
  }

  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  public getDatabase(): PrismaClient {
    return this.client;
  }
}
