import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1708129025269 implements MigrationInterface {
    name = 'Init1708129025269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credential" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3a5169bcd3d5463cefeec78be82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "credential"`);
    }

}
