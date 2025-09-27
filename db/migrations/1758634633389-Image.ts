import { MigrationInterface, QueryRunner } from "typeorm";

export class Image1758634633389 implements MigrationInterface {
    name = 'Image1758634633389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "program" ADD "imageId" integer`);
        await queryRunner.query(`ALTER TABLE "program" ADD CONSTRAINT "UQ_0d60c9653335cfa0eabbc5195aa" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "program" ADD CONSTRAINT "FK_0d60c9653335cfa0eabbc5195aa" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "program" DROP CONSTRAINT "FK_0d60c9653335cfa0eabbc5195aa"`);
        await queryRunner.query(`ALTER TABLE "program" DROP CONSTRAINT "UQ_0d60c9653335cfa0eabbc5195aa"`);
        await queryRunner.query(`ALTER TABLE "program" DROP COLUMN "imageId"`);
    }

}
