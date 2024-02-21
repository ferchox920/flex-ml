import { MigrationInterface, QueryRunner } from "typeorm";

export class InitShipping021708493713045 implements MigrationInterface {
    name = 'InitShipping021708493713045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "deliver_to" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_entity" ALTER COLUMN "deliver_to" SET NOT NULL`);
    }

}
