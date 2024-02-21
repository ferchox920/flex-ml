import { MigrationInterface, QueryRunner } from "typeorm";

export class InitShipping031708493874275 implements MigrationInterface {
    name = 'InitShipping031708493874275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "site_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "free_options" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "shipping_modes" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "shipping_modes" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "free_options" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "site_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "name" SET NOT NULL`);
    }

}
