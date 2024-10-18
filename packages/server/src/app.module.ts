import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetricsModule } from './metrics/metrics.module';
import { MetricsController } from "./metrics/metrics.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 54325,
      password: 'exnation',
      username: 'postgres',
      database: 'exnation',
      synchronize: true, // Should only be true in development
      logging: true,
    }),
    MetricsModule,
  ],
  controllers: [MetricsController],
  providers: [],
})

export class AppModule {}
