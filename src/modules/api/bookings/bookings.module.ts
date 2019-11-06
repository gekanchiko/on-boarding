import { Module } from "@nestjs/common";
import { BookingsController } from "./bookings.controller";
import { DatabaseModule } from "../../database/database.module";
import { BookingsService } from "./bookings.service";
import { LocationsModule } from "../locations/locations.module";

@Module({
  imports: [
    DatabaseModule,
    LocationsModule
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService]
})
export class BookingsModule {}