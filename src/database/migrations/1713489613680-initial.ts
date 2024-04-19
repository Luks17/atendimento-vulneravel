import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1713489613680 implements MigrationInterface {
    name = 'Initial1713489613680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`solicitacoes\` (\`id\` char(36) NOT NULL, \`estado\` enum ('pendente', 'reprovada', 'aprovada') NOT NULL, \`tipo_problema\` enum ('catastrofe', 'doenca', 'acidente') NOT NULL, \`descricao_problema\` text NOT NULL, \`numero_vagas_escola\` int NULL, \`numero_vagas_creche\` int NULL, \`quantidade_cestas\` int NULL, \`quantidade\` int NULL, \`descriminador\` enum ('auxilio_medicamento', 'cesta_basica', 'vaga_creche', 'vaga_escola') NOT NULL, \`usuarioIdId\` char(36) NULL, INDEX \`IDX_bc9ed6db32ec43afcea758cdd3\` (\`descriminador\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`situacoes\` (\`usuario_id\` char(36) NOT NULL, \`moradia\` enum ('casa_propria', 'aluguel') NOT NULL, \`total_adultos\` int NOT NULL, \`total_criancas\` int NOT NULL, \`renda_familiar\` decimal(10,3) NOT NULL, \`valor_aluguel\` decimal(10,3) NULL, PRIMARY KEY (\`usuario_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` char(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`nome\` varchar(255) NOT NULL, \`passwd\` varchar(255) NOT NULL, \`situacaoUsuarioId\` char(36) NULL, UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), UNIQUE INDEX \`REL_c08f3fdbf1934c490e173ee116\` (\`situacaoUsuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` varchar(255) NOT NULL, \`expires_at\` datetime NOT NULL, \`usuarioIdId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`solicitacoes\` ADD CONSTRAINT \`FK_08d6e02f5a61351e184c87a5920\` FOREIGN KEY (\`usuarioIdId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_c08f3fdbf1934c490e173ee1168\` FOREIGN KEY (\`situacaoUsuarioId\`) REFERENCES \`situacoes\`(\`usuario_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_921c53cac76eb9ef9625351ee3e\` FOREIGN KEY (\`usuarioIdId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_921c53cac76eb9ef9625351ee3e\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_c08f3fdbf1934c490e173ee1168\``);
        await queryRunner.query(`ALTER TABLE \`solicitacoes\` DROP FOREIGN KEY \`FK_08d6e02f5a61351e184c87a5920\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP INDEX \`REL_c08f3fdbf1934c490e173ee116\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`situacoes\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc9ed6db32ec43afcea758cdd3\` ON \`solicitacoes\``);
        await queryRunner.query(`DROP TABLE \`solicitacoes\``);
    }

}
