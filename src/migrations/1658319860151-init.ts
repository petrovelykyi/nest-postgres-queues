import { MigrationInterface, QueryRunner } from "typeorm";

export class init1658319860151 implements MigrationInterface {
    name = 'init1658319860151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "film" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "openingCrawl" character varying NOT NULL, "director" character varying NOT NULL, "producer" character varying NOT NULL, "url" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_91baa4f1f62ea493de2afdd3d6" ON "film" ("title") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_91baa4f1f62ea493de2afdd3d6"`);
        await queryRunner.query(`DROP TABLE "film"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
