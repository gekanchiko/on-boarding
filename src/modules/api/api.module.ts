import { Module } from "@nestjs/common";

import { LocationsModule } from "./locations/locations.module";
import { BookingsModule } from "./bookings/bookings.module";

@Module({
  imports: [
    LocationsModule,
    BookingsModule
  ],
})
export class APIModule {}
