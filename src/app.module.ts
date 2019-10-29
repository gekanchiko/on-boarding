import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@selinarnd/nest-config";
import { CoreModule } from "@selinarnd/nest-core";
import { LoggingModule } from "@selinarnd/nest-logging";
import { PromModule, RequestMetricsInterceptor } from "@selinarnd/nest-prom";
import { getPackageInfo } from "@selinarnd/node-utils";
import { Connection } from "typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APIModule } from "./modules/api/api.module";
import { DatabaseModule } from "./modules/database/database.module";
import { TypeOrmConfigService } from "./modules/database/services/typeorm-config.service";

@Module({
  imports: [
    CoreModule,
    ConfigModule,
    LoggingModule,
    PromModule.forRoot({
      defaultLabels: {
        app: `v${getPackageInfo().version}`,
      },
      useHttpMetricsInterceptor: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    APIModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestMetricsInterceptor,
    },
  ],
})
export class AppModule {
  // @ts-ignore
  constructor(private readonly connection: Connection) {}
}
