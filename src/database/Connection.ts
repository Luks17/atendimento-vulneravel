import "reflect-metadata";
import { DataSource, ObjectLiteral, ObjectType, Repository } from "typeorm";
import { Vulneravel } from "./models/Vulneravel";
import { ProblemaSaude } from "./models/ProblemaSaude";
import { Initial1710122007898 } from "./migrations/1710122007898-initial";

export const dbDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: false,
  entities: [Vulneravel, ProblemaSaude],
  migrations: [Initial1710122007898],
  subscribers: [],
});

class DatabaseSource {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = dbDataSource;
  }

  async getConnection(): Promise<DataSource> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }

    return this.dataSource;
  }

  async getRepository<T extends ObjectLiteral>(
    entity: ObjectType<T>,
  ): Promise<Repository<T>> {
    const connection = await this.getConnection();
    return connection.getRepository(entity);
  }
}

export const dbSource = new DatabaseSource();
