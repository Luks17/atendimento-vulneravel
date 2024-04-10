import "reflect-metadata";
import { DataSource, ObjectLiteral, ObjectType, Repository } from "typeorm";
import { Vulneravel } from "./models/Vulneravel";
import { ProblemaSaude } from "./models/ProblemaSaude";
import { Usuario } from "./models/Usuario";
import { Initial1712781292019 } from "./migrations/1712781292019-initial";

export const dbDataSource = new DataSource({
  type: "mysql",
  url: process.env.MYSQL_URL,
  synchronize: false,
  entities: [Usuario, Vulneravel, ProblemaSaude],
  migrations: [Initial1712781292019],
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
