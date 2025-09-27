import { MigrationInterface, QueryRunner } from "typeorm";

export class Initiative1758649182645 implements MigrationInterface {
    name = 'Initiative1758649182645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "initiative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "imageId" integer, CONSTRAINT "REL_0f0039c6da44781febf98d2717" UNIQUE ("imageId"), CONSTRAINT "PK_139c30696418b01a4922ce3b916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "initiative" ADD CONSTRAINT "FK_0f0039c6da44781febf98d27172" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "initiative" DROP CONSTRAINT "FK_0f0039c6da44781febf98d27172"`);
        await queryRunner.query(`DROP TABLE "initiative"`);
    }

}
