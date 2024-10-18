import { Module } from '@nestjs/common';
import { MeterDataService } from './meterdata.service';
import { PrismaService } from '~/prisma.service';

@Module({
  providers: [PrismaService, MeterDataService],
  exports: [MeterDataService],
})
export class MeterdataModule {}
