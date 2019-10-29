import { Module } from "@nestjs/common";

import { ConfigModule } from "@selinarnd/nest-config";
import { TypeOrmConfigService } from "./services/typeorm-config.service";

@Module({
  imports: [ConfigModule],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class DatabaseModule {}
