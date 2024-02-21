import { MigrationInterface, QueryRunner } from "typeorm";

export class InitShipping041708493947920 implements MigrationInterface {
    name = 'InitShipping041708493947920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "currency_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "currency_id" SET NOT NULL`);
    }

}
