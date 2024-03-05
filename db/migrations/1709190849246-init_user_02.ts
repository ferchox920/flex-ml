import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUser021709190849246 implements MigrationInterface {
    name = 'InitUser021709190849246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credentials" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "ecommerce_id" uuid, CONSTRAINT "REL_25dd32088be80761d17d97867d" UNIQUE ("ecommerce_id"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_25dd32088be80761d17d97867da" FOREIGN KEY ("ecommerce_id") REFERENCES "ecommerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_25dd32088be80761d17d97867da"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
    }

}
