import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";

import { LocationEntity } from "../../database/entities/location.entity";
import { LocationDTO } from "../dtos/location.dto";
import { TransformPlainToClass } from "class-transformer";

import { RoomType } from "../enums/room-type.enum";
import { RoomDTO } from "../dtos/room.dto";
import { PriceDTO } from "../dtos/price.dto";
import { RoomEntity } from "../../database/entities/room.entity";
import { BookEntity } from "../../database/entities/book.entity";
import { PriceEntity } from "../../database/entities/price.entity";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationsRepository: Repository<LocationEntity>,
    @InjectRepository(RoomEntity)
    private roomsRepository: Repository<RoomEntity>,
    @InjectRepository(BookEntity)
    private bookingsRepository: Repository<BookEntity>,
    @InjectRepository(PriceEntity)
    private pricesRepository: Repository<PriceEntity>,
  ) {}

  @TransformPlainToClass(LocationDTO)
  async findAll(): Promise<LocationDTO[]> {
    // @ts-ignore
    return this.locationsRepository.find();
  }

  @TransformPlainToClass(RoomDTO)
  async findRooms({
    locationId
  }: {
    locationId: string
  }): Promise<RoomDTO[]> {
    // @ts-ignore
    return this.roomsRepository.find({ where: { locationId } });
  }

  @TransformPlainToClass(PriceDTO)
  async findAvailable({
    locationId,
    startDate,
    endDate
  }: {
    locationId: string,
    startDate: string;
    endDate: string;
  }): Promise<PriceDTO[]> {

    const prices = await this.pricesRepository
      .find({ where: { location: { id: locationId } } });

    const freeRooms = await this.findFreeRooms({ locationId, startDate, endDate });

    // @ts-ignore
    return prices
      .filter(
        ({ roomType }) => freeRooms.some(_ => _.type === roomType)
      );
  }

  async findFreeRooms({
    locationId,
    roomType,
    startDate,
    endDate
  }: {
    locationId: string,
    roomType?: RoomType,
    startDate: string;
    endDate: string;
  }): Promise<RoomDTO[]> {
    const bookingsInRange = await this.bookingsRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.room", "room")
      .where(new Brackets(q =>
        q
          .where(`"book"."checkInDate"::date <= :startDate`, { startDate })
          .andWhere(`"book"."checkOutDate"::date > :endDate`, { endDate })
      ))
      .orWhere(new Brackets(q =>
        q
          .where(`"book"."checkInDate"::date >= :startDate`, { startDate })
          .andWhere(`"book"."checkInDate"::date < :endDate`, { endDate })
      ))
      .orWhere(new Brackets(q =>
        q
          .where(`"book"."checkOutDate"::date > :startDate`, { startDate })
          .andWhere(`"book"."checkOutDate"::date < :endDate`, { endDate })
      ))
      .getMany();

    const ids = bookingsInRange.map(({ room }) => room.id);

    let queryBuilder = this.roomsRepository
      .createQueryBuilder("room")
      .where(`"room"."locationId" = :locationId`, { locationId });

    if (roomType) {
      queryBuilder = queryBuilder.andWhere(`"room".type = :roomType`, { roomType });
    }

    if (ids.length) {
      queryBuilder = queryBuilder.andWhere(`"room".id NOT IN (:...ids)`, { ids });
    }

    // @ts-ignore
    return queryBuilder
      .getMany();

  }

}