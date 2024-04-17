import "reflect-metadata";
import { DataSource, ObjectLiteral, ObjectType, Repository } from "typeorm";
import { Usuario } from "./models/Usuario";
import { Session } from "./models/Session";
import { Solicitacao } from "./models/Solicitacao";
import { Situacao } from "./models/Situacao";
import { Problema } from "./models/Problema";
import { Auxilio } from "./models/Auxilio";
import { Initial1713312267856 } from "./migrations/1713312267856-initial";

export const dbDataSource = new DataSource({
  type: "mysql",
  url: process.env.MYSQL_URL,
  synchronize: false,
  entities: [Usuario, Session, Solicitacao, Situacao, Problema, Auxilio],
  migrations: [Initial1713312267856],
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
