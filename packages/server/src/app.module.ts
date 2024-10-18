import { Module } from '@nestjs/common';

import { MeterdataModule } from '~/meterdata/meterdata.module';
import { MeterdataController } from "~/meterdata/meterdata.controller";

@Module({
  imports: [
    MeterdataModule,
  ],
  controllers: [MeterdataController],
  providers: [],
})

export class AppModule {}
