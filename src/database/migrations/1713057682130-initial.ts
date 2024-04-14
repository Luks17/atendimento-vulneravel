import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1713057682130 implements MigrationInterface {
    name = 'Initial1713057682130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`problemas_saude\` (\`tipo\` varchar(50) NOT NULL, PRIMARY KEY (\`tipo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vulneraveis\` (\`id\` char(36) NOT NULL, \`nome\` varchar(155) NOT NULL, \`total_adultos\` int NOT NULL, \`moradia\` enum ('casa_propria', 'aluguel') NOT NULL, \`despesas_saude\` decimal(10,3) NULL, \`perdas_catastrofes\` enum ('nenhum', 'incendio', 'temporal', 'enchente') NOT NULL, \`cesta_basica\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` char(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`nome\` varchar(255) NOT NULL, \`passwd\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` varchar(255) NOT NULL, \`expires_at\` datetime NOT NULL, \`usuarioIdId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vulneraveis_tipos_problemas_saude\` (\`vulneraveisId\` char(36) NOT NULL, \`problemasSaudeTipo\` varchar(50) NOT NULL, INDEX \`IDX_debff590432316538c648596c0\` (\`vulneraveisId\`), INDEX \`IDX_09911fd8d3e38a51e1591bf224\` (\`problemasSaudeTipo\`), PRIMARY KEY (\`vulneraveisId\`, \`problemasSaudeTipo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_921c53cac76eb9ef9625351ee3e\` FOREIGN KEY (\`usuarioIdId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vulneraveis_tipos_problemas_saude\` ADD CONSTRAINT \`FK_debff590432316538c648596c03\` FOREIGN KEY (\`vulneraveisId\`) REFERENCES \`vulneraveis\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vulneraveis_tipos_problemas_saude\` ADD CONSTRAINT \`FK_09911fd8d3e38a51e1591bf2248\` FOREIGN KEY (\`problemasSaudeTipo\`) REFERENCES \`problemas_saude\`(\`tipo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vulneraveis_tipos_problemas_saude\` DROP FOREIGN KEY \`FK_09911fd8d3e38a51e1591bf2248\``);
        await queryRunner.query(`ALTER TABLE \`vulneraveis_tipos_problemas_saude\` DROP FOREIGN KEY \`FK_debff590432316538c648596c03\``);
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_921c53cac76eb9ef9625351ee3e\``);
        await queryRunner.query(`DROP INDEX \`IDX_09911fd8d3e38a51e1591bf224\` ON \`vulneraveis_tipos_problemas_saude\``);
        await queryRunner.query(`DROP INDEX \`IDX_debff590432316538c648596c0\` ON \`vulneraveis_tipos_problemas_saude\``);
        await queryRunner.query(`DROP TABLE \`vulneraveis_tipos_problemas_saude\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`vulneraveis\``);
        await queryRunner.query(`DROP TABLE \`problemas_saude\``);
    }

}
