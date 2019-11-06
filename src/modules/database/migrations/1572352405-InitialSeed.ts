import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

import { locationSeed } from "../seeds/location.seed";

export class InitialSeed1572352828851 implements MigrationInterface {
  async down(_: QueryRunner): Promise<any> {
    return undefined;
  }

  async up(_: QueryRunner): Promise<any> {
    await getRepository("country").save(locationSeed);
  }

}