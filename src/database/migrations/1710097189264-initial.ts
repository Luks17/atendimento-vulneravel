import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710097189264 implements MigrationInterface {
    name = 'Initial1710097189264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."vulneraveis_moradia_enum" AS ENUM('casa_propria', 'aluguel')`);
        await queryRunner.query(`CREATE TYPE "public"."vulneraveis_perdas_catastrofes_enum" AS ENUM('nenhum', 'incendio', 'temporal', 'enchente')`);
        await queryRunner.query(`CREATE TABLE "vulneraveis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(155) NOT NULL, "total_adultos" integer NOT NULL, "moradia" "public"."vulneraveis_moradia_enum" NOT NULL, "problemas_saude_familia" text NOT NULL, "despesas_saude" numeric(10,3), "perdas_catastrofes" "public"."vulneraveis_perdas_catastrofes_enum" NOT NULL, "cesta_basica" boolean NOT NULL, CONSTRAINT "PK_7c2a0026e244e3db7f959c61f5a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vulneraveis"`);
        await queryRunner.query(`DROP TYPE "public"."vulneraveis_perdas_catastrofes_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vulneraveis_moradia_enum"`);
    }

}
