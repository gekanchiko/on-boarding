import { getRepository, getConnection } from "typeorm";
import {HttpStatus, INestApplication} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import request from "supertest";

import { locationSeed } from "../../src/modules/database/seeds/location.seed";
import { DatabaseModule } from "../../src/modules/database/database.module";
import { TypeOrmConfigService } from "../../src/modules/database/services/typeorm-config.service";
import { LocationsModule } from "../../src/modules/api/locations/locations.module";
import { BookingsController } from "../../src/modules/api/bookings/bookings.controller";
import { BookingsService } from "../../src/modules/api/bookings/bookings.service";
import { RoomType } from "../../src/modules/api/enums/room-type.enum";

describe("Bookings Controller (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [DatabaseModule],
          useClass: TypeOrmConfigService,
          inject: [TypeOrmConfigService],
        }),
        LocationsModule
      ],
      controllers: [BookingsController],
      providers: [BookingsService],
      exports: [BookingsService]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await getRepository("country").save(locationSeed);
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    await app.close();
  });

  describe("/bookings/book (POST)", () => {

    let locationId: string;

    beforeAll(async () => {
      const locations = await request(app.getHttpServer())
        .get("/locations")
        .expect(HttpStatus.OK)
        .then(response => response.body);

      locationId = locations.find(({ name }) => name === "Selina Villa de Leyva").id;
    });

    it("should book a room", async () => {
      await request(app.getHttpServer())
        .post("/bookings/book")
        .query({
          locationId,
          roomType: RoomType.Dorm
        })
        .send({
          startDate: "2019-11-16",
          endDate: "2019-11-18",
        })
        .expect(HttpStatus.CREATED);
    });

    it("should get an error", async () => {
      await request(app.getHttpServer())
        .post("/bookings/book")
        .query({
          locationId,
          roomType: RoomType.Deluxe
        })
        .send({
          startDate: "2019-11-06",
          endDate: "2019-11-07",
        })
        .expect(HttpStatus.CONFLICT);
    });

  });
});
