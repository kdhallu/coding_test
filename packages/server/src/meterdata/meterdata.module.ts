import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { PrismaService } from '~/prisma.service';

@Module({
  providers: [PrismaService, MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
