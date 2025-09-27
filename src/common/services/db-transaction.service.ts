import { Injectable } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class DbTransactionService {
  constructor(private readonly connection: Connection) {}

  async runInTransaction<T>(
    action: (runner: QueryRunner) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await action(queryRunner);

      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return undefined as any;
  }
}
