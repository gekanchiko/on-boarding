import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getPackageInfo } from "@selinarnd/node-utils";
import request from "supertest";
import { AppController } from "../../src/app.controller";
import { AppService } from "../../src/app.service";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      exports: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test("/version (GET)", async () => {
    await request(app.getHttpServer())
      .get("/version")
      .expect(200)
      .expect({ version: getPackageInfo().version });
  });
});
