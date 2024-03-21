import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1710122007898 implements MigrationInterface {
    name = 'Initial1710122007898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "problemas_saude" ("tipo" character varying(50) NOT NULL, CONSTRAINT "PK_5aa1b72a146d53bcab2156c1a1e" PRIMARY KEY ("tipo"))`);
        await queryRunner.query(`CREATE TYPE "public"."vulneraveis_moradia_enum" AS ENUM('casa_propria', 'aluguel')`);
        await queryRunner.query(`CREATE TYPE "public"."vulneraveis_perdas_catastrofes_enum" AS ENUM('nenhum', 'incendio', 'temporal', 'enchente')`);
        await queryRunner.query(`CREATE TABLE "vulneraveis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(155) NOT NULL, "total_adultos" integer NOT NULL, "moradia" "public"."vulneraveis_moradia_enum" NOT NULL, "despesas_saude" numeric(10,3), "perdas_catastrofes" "public"."vulneraveis_perdas_catastrofes_enum" NOT NULL, "cesta_basica" boolean NOT NULL, CONSTRAINT "PK_7c2a0026e244e3db7f959c61f5a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vulneraveis_tipos_problemas_saude" ("vulneraveisId" uuid NOT NULL, "problemasSaudeTipo" character varying(50) NOT NULL, CONSTRAINT "PK_ec327e82ad80f5632f8e02dcbf8" PRIMARY KEY ("vulneraveisId", "problemasSaudeTipo"))`);
        await queryRunner.query(`CREATE INDEX "IDX_debff590432316538c648596c0" ON "vulneraveis_tipos_problemas_saude" ("vulneraveisId") `);
        await queryRunner.query(`CREATE INDEX "IDX_09911fd8d3e38a51e1591bf224" ON "vulneraveis_tipos_problemas_saude" ("problemasSaudeTipo") `);
        await queryRunner.query(`ALTER TABLE "vulneraveis_tipos_problemas_saude" ADD CONSTRAINT "FK_debff590432316538c648596c03" FOREIGN KEY ("vulneraveisId") REFERENCES "vulneraveis"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vulneraveis_tipos_problemas_saude" ADD CONSTRAINT "FK_09911fd8d3e38a51e1591bf2248" FOREIGN KEY ("problemasSaudeTipo") REFERENCES "problemas_saude"("tipo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vulneraveis_tipos_problemas_saude" DROP CONSTRAINT "FK_09911fd8d3e38a51e1591bf2248"`);
        await queryRunner.query(`ALTER TABLE "vulneraveis_tipos_problemas_saude" DROP CONSTRAINT "FK_debff590432316538c648596c03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_09911fd8d3e38a51e1591bf224"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_debff590432316538c648596c0"`);
        await queryRunner.query(`DROP TABLE "vulneraveis_tipos_problemas_saude"`);
        await queryRunner.query(`DROP TABLE "vulneraveis"`);
        await queryRunner.query(`DROP TYPE "public"."vulneraveis_perdas_catastrofes_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vulneraveis_moradia_enum"`);
        await queryRunner.query(`DROP TABLE "problemas_saude"`);
    }

}
