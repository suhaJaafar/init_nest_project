import { MigrationInterface, QueryRunner } from "typeorm";

export class Program1758484341306 implements MigrationInterface {
    name = 'Program1758484341306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "program" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "imageUrl" character varying NOT NULL, "published" TIMESTAMP NOT NULL, CONSTRAINT "PK_3bade5945afbafefdd26a3a29fb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "program"`);
    }

}
