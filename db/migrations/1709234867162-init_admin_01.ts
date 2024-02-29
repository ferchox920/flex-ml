import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAdmin011709234867162 implements MigrationInterface {
    name = 'InitAdmin011709234867162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."admins_roles_enum" AS ENUM('admin', 'professional', 'user')`);
        await queryRunner.query(`CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50), "lastname" character varying(50), "email" character varying(100) NOT NULL, "roles" "public"."admins_roles_enum" NOT NULL DEFAULT 'admin', "password" character varying(100), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admins"`);
        await queryRunner.query(`DROP TYPE "public"."admins_roles_enum"`);
    }

}
