import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRefreshTokenModel1720764381303 implements MigrationInterface {
    name = 'UpdateRefreshTokenModel1720764381303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_f548818d46a1315d4e1d5e62da5"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "senderId"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "recipientId"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP COLUMN "deviceId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "sender_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "recipient_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_22133395bd13b970ccd0c34ab22" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_566c3d68184e83d4307b86f85ab" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_566c3d68184e83d4307b86f85ab"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_22133395bd13b970ccd0c34ab22"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "recipient_id"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sender_id"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD "deviceId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "recipientId" uuid`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "senderId" uuid`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_f548818d46a1315d4e1d5e62da5" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
