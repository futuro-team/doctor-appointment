import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersMigraion1626359488419 implements MigrationInterface {
  name = 'UsersMigraion1626359488419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying, "lastName" character varying, "mobilePhone" character varying, "email" character varying, "login" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'guest', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO users (firstName, lastName, mobilePhone, login, email, password, role) VALUES ('admin', 'admin', '0123456789', 'admin', 'admin@admin.com', '$2b$12$S/KzkbYJxHTi1s.5uP72Wuka53RD2ntAA8P857TbcL/YoVxMDPbuq', 'admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}