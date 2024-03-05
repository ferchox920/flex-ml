import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUser1709167564087 implements MigrationInterface {
    name = 'InitUser1709167564087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credentials" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "ecommerce_id" uuid, CONSTRAINT "REL_25dd32088be80761d17d97867d" UNIQUE ("ecommerce_id"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ecommerce" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50), "code" character varying(50), "app_id" character varying(50), "client_secret" character varying(50), "redirect_uri" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_e67660bf2a224d8ce3d2b1b57ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50), "lastname" character varying(50), "email" character varying(100) NOT NULL, "number" character varying(20), "password" character varying(100), "deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_25dd32088be80761d17d97867da" FOREIGN KEY ("ecommerce_id") REFERENCES "ecommerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecommerce" ADD CONSTRAINT "FK_0a9478a6bcfa0be3b3fde372604" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecommerce" DROP CONSTRAINT "FK_0a9478a6bcfa0be3b3fde372604"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_25dd32088be80761d17d97867da"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "ecommerce"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
    }

}