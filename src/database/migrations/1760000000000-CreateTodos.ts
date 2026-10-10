import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodos1760000000000 implements MigrationInterface {
  name = 'CreateTodos1760000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "todo_status" AS ENUM ('todo', 'in-progress', 'done')`);
    await queryRunner.query(`
      CREATE TABLE "todos" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying(255) NOT NULL,
        "description" text,
        "status" "todo_status" NOT NULL DEFAULT 'todo',
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_todos_id" PRIMARY KEY ("id")
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todos"`);
    await queryRunner.query(`DROP TYPE "todo_status"`);
  }
}
