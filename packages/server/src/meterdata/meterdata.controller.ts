import {Controller, Get, Param, Query, Post} from '@nestjs/common';
import {MetricsService} from './metrics.service';

@Controller('/metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {
  }

  @Get('')
  async getMetricsInRangeByOrganisation(
    @Query('organization') organization: string,
    @Query('aggregateBy') aggregateBy: string,
  ) {
    const response = await this.metricsService.getMetricsInRangeByOrganization(
      organization,
      aggregateBy
    );
    return response;
  }
}
