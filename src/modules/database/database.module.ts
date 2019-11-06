import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@selinarnd/nest-config";

import { TypeOrmConfigService } from "./services/typeorm-config.service";
import { LocationEntity } from "./entities/location.entity";
import { RoomEntity } from "./entities/room.entity";
import { BookEntity } from "./entities/book.entity";
import { PriceEntity } from "./entities/price.entity";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      LocationEntity,
      BookEntity,
      RoomEntity,
      PriceEntity,
    ])
  ],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class DatabaseModule {}
