import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExpense1714346006222 implements MigrationInterface {
    name = 'CreateExpense1714346006222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`expense\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` int NOT NULL, \`date\` datetime NOT NULL, \`description\` varchar(191) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`expense\` ADD CONSTRAINT \`FK_06e076479515578ab1933ab4375\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_06e076479515578ab1933ab4375\``);
        await queryRunner.query(`DROP TABLE \`expense\``);
    }

}
