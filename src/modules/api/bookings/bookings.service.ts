import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BookEntity } from "../../database/entities/book.entity";
import { RoomType } from "../enums/room-type.enum";
import { LocationsService } from "../locations/locations.service";

@Injectable()
export class BookingsService {
  constructor(
    private locationsService: LocationsService,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>
  ) {}

  async book({
    locationId,
    roomType,
    startDate,
    endDate
  }: {
    locationId: string,
    roomType: RoomType,
    startDate: string,
    endDate: string
  }) {
    const freeRooms = await this.locationsService
      .findFreeRooms({ locationId, startDate, endDate, roomType });

    if (!freeRooms.length) {
      throw new ConflictException(`There are no free rooms of "${roomType}" type`)
    }

    const room = freeRooms[0];

    return this.bookRepository.save({ checkInDate: startDate, checkOutDate: endDate, room });
  }

}