import { getRepository, getConnection } from "typeorm";
import {HttpStatus, INestApplication} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import request from "supertest";

import { locationSeed } from "../../src/modules/database/seeds/location.seed";
import { DatabaseModule } from "../../src/modules/database/database.module";
import { LocationsController } from "../../src/modules/api/locations/locations.controller";
import { LocationsService } from "../../src/modules/api/locations/locations.service";
import { TypeOrmConfigService } from "../../src/modules/database/services/typeorm-config.service";

describe("Locations Controller (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [DatabaseModule],
          useClass: TypeOrmConfigService,
          inject: [TypeOrmConfigService],
        })
      ],
      controllers: [LocationsController],
      providers: [LocationsService],
      exports: [LocationsService]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await getRepository("country").save(locationSeed);
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    await app.close();
  });

  describe("/locations (GET)", () => {

    it("should provide a list of all locations", async () => {
      const locations = await request(app.getHttpServer())
        .get("/locations")
        .expect(HttpStatus.OK)
        .then(response => response.body);

      expect(locations).toHaveLength(8);
    });

  });

  describe("/locations/:locationId/available (GET)", () => {

    it("should display available rooms", async () => {
      const locations = await request(app.getHttpServer())
        .get("/locations")
        .expect(200)
        .then(response => response.body);

      const location = locations.find(({ name }) => name === "Selina Villa de Leyva");

      const available = await request(app.getHttpServer())
        .get(`/locations/${location.id}/available`)
        .query({
          startDate: "2019-11-03",
          endDate: "2019-11-11"
        })
        .expect(HttpStatus.OK)
        .then(response => response.body);

      expect(available).toHaveLength(2);
    });

  });
});
