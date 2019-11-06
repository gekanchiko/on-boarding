import {HttpStatus, INestApplication} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getConnection, getRepository } from "typeorm";
import request from "supertest";

import { DatabaseModule } from "../../../../../src/modules/database/database.module";
import { TypeOrmConfigService } from "../../../../../src/modules/database/services/typeorm-config.service";
import { LocationsController } from "../../../../../src/modules/api/locations/locations.controller";
import { LocationsService } from "../../../../../src/modules/api/locations/locations.service";
import { locationSeed } from "../../../../../src/modules/database/seeds/location.seed";
import { RoomType } from "../../../../../src/modules/api/enums/room-type.enum";

describe("LocationsService", () => {
  let app: INestApplication;

  let locationsService: LocationsService;

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

    locationsService = app.get(LocationsService);

    await getRepository("country").save(locationSeed);
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    await app.close();
  });

  describe("Find free rooms", () => {
    let locationId: string;

    beforeAll(async () => {
      const locations = await request(app.getHttpServer())
        .get("/locations")
        .expect(HttpStatus.OK)
        .then(response => response.body);

      locationId = locations.find(({ name }) => name === "Selina Villa de Leyva").id;
    });

    const toHaveRoomsByType = (rooms, type, expectedLength) => {
      expect(rooms.filter(_ => _.type === type)).toHaveLength(expectedLength);
    };

    it("should provide all 6 free rooms", async () => {
      const period = { startDate: "2019-11-15", endDate: "2019-11-22" };
      const freeRooms = await locationsService.findFreeRooms({ locationId, ...period });
      expect(freeRooms).toHaveLength(6);
    });

    it("should provide 3 free rooms", async () => {
      const period = { startDate: "2019-11-03", endDate: "2019-11-11" };
      const freeRooms = await locationsService.findFreeRooms({ locationId, ...period });
      toHaveRoomsByType(freeRooms, RoomType.Dorm, 1);
      toHaveRoomsByType(freeRooms, RoomType.Private, 2);
      toHaveRoomsByType(freeRooms, RoomType.Deluxe, 0);
    });

    it('should include one "dorm" room type which check-out date matches new check-in date', async () => {
      const period = { startDate: "2019-11-05", endDate: "2019-11-11" };
      const freeRooms = await locationsService.findFreeRooms({ locationId, ...period });
      toHaveRoomsByType(freeRooms, RoomType.Dorm, 2);
      toHaveRoomsByType(freeRooms, RoomType.Private, 2);
      toHaveRoomsByType(freeRooms, RoomType.Deluxe, 0);
    });

    it('should include "private" and "deluxe" rooms which check-in date matches new check-out date', async () => {
      const period = { startDate: "2019-10-30", endDate: "2019-11-02" };
      const freeRooms = await locationsService.findFreeRooms({ locationId, ...period });
      toHaveRoomsByType(freeRooms, RoomType.Dorm, 1);
      toHaveRoomsByType(freeRooms, RoomType.Private, 3);
      toHaveRoomsByType(freeRooms, RoomType.Deluxe, 1);
    });

  });

});