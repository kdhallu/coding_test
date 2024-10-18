import {Controller, Get, Query} from '@nestjs/common';
import {MeterDataService} from './meterdata.service';

@Controller('/meter')
export class MeterdataController {
  constructor(private readonly meterDataService: MeterDataService) {
  }

  //@ts-ignore
  @Get('/measurements')
  async getMeasurements(
    @Query('muid') meterId: string,
    @Query('limit') limit: number,
    @Query('start') start: string,
    @Query('stop') stop: string,
  ) {

    const response = await this.meterDataService.getMeterMeasurements(
        meterId,
        limit,
        start,
        stop
    );
    return response;
  }
}
