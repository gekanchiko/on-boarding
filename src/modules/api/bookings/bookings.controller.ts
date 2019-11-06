import { Body, Controller, Post, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiUseTags } from "@nestjs/swagger";

import { BookingsService } from "./bookings.service";
import { BookRoomDTO } from "./dtos/book-room.dto";
import { BookDatesDTO } from "./dtos/book-dates.dto";

@ApiUseTags("bookings")
@Controller("bookings")
export class BookingsController {

  constructor(
    private bookingsService: BookingsService
  ) {}

  @Post("book")
  @ApiOperation({
    title: "Book a room",
    description: "Endpoint for booking a room",
  })
  @ApiOkResponse({
    description: "The room booked successfully"
  })
  book(
    @Query() bookRoom: BookRoomDTO,
    @Body() bookDates: BookDatesDTO
  ) {
    return this.bookingsService.book({ ...bookRoom, ...bookDates });
  }

}