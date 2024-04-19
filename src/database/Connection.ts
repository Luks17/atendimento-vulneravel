import "reflect-metadata";
import { DataSource, ObjectLiteral, ObjectType, Repository } from "typeorm";
import { Session } from "./models/Session";
import { Situacao } from "./models/Situacao";
import { Solicitacao } from "./models/Solicitacao";
import { Usuario } from "./models/Usuario";
import { AuxilioMedicamento } from "./models/Solicitacao/AuxilioMedicamento";
import { CestaBasica } from "./models/Solicitacao/CestaBasica";
import { VagaCreche } from "./models/Solicitacao/VagaCreche";
import { VagaEscola } from "./models/Solicitacao/VagaEscola";

export const dbDataSource = new DataSource({
  type: "mysql",
  url: process.env.MYSQL_URL,
  synchronize: false,
  entities: [
    Session,
    Situacao,
    Solicitacao,
    Usuario,
    AuxilioMedicamento,
    CestaBasica,
    VagaCreche,
    VagaEscola,
  ],
  migrations: ["src/database/migrations/**/*.ts|js"],
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
