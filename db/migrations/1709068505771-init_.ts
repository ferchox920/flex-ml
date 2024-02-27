import { MigrationInterface, QueryRunner } from "typeorm";

export class Init_1709068505771 implements MigrationInterface {
    name = 'Init_1709068505771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shipping_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "idMl" character varying NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "deliver_to" character varying NOT NULL, "status" character varying NOT NULL, "site_id" character varying NOT NULL, "free_options" jsonb NOT NULL, "shipping_modes" jsonb, "company_id" integer, "company_name" character varying, "min_time" integer, "max_time" integer, "currency_id" character varying NOT NULL, CONSTRAINT "PK_23ec35ef7f3e6c1878c1a20e32d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credential_entity" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_51c7200ad555489805d2147c9ff" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "credential_entity"`);
        await queryRunner.query(`DROP TABLE "shipping_entity"`);
    }

}
