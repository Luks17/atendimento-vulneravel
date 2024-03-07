import { Vulneravel } from "@/models/Vulneravel";
import "reflect-metadata";
import { DataSource } from "typeorm";

export class DatabaseConnection {
  private connection: DataSource;

  constructor() {
    this.connection = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "caridade",
      username: "root",
      password: "1234",
      logging: true,
      entities: [Vulneravel],
      migrations: [],
      subscribers: [],
    });
  }

  async getConnection() {
    if (!this.connection.isInitialized) {
      await this.connection.initialize();
    }

    return this.connection;
  }
}
