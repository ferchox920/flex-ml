import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUser031709191182006 implements MigrationInterface {
    name = 'InitUser031709191182006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id")`);
    }

}
