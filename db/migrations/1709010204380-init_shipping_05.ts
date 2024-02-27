import { MigrationInterface, QueryRunner } from "typeorm";

export class InitShipping051709010204380 implements MigrationInterface {
    name = 'InitShipping051709010204380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shipping_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "deliver_to" character varying NOT NULL, "status" character varying NOT NULL, "site_id" character varying NOT NULL, "free_options" jsonb NOT NULL, "shipping_modes" jsonb, "company_id" integer, "company_name" character varying, "min_time" integer, "max_time" integer, "currency_id" character varying NOT NULL, CONSTRAINT "PK_23ec35ef7f3e6c1878c1a20e32d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shipping_entity"`);
    }

}
