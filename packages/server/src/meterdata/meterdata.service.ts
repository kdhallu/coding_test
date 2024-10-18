import {Injectable} from '@nestjs/common';
import {PrismaService} from './../prisma.service';
import {mapResponse} from '../utils';

interface Tag {
    muid: string;
    quality: string;
}

interface MeterData {
    measurement: string;
    timestamp: string;
    tags: Tag[];
    value: number;
}

@Injectable()
export class MeterDataService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getMeterMeasurements(
        meterId: string,
        limit: number,
        start?: string,
        stop?: string // Make start and stop optional
    ) {
        try {
            const whereCondition: any = {
                tags: {
                    path: ['muid'],
                    equals: meterId,
                },
            };

            // Only add timestamp filters if both start and stop are provided
            if (start && stop) {
                whereCondition.timestamp = {
                    gte: new Date(`${start}T00:00:00.000Z`), // Start date, at 00:00:00
                    lte: new Date(`${stop}T23:59:59.999Z`),  // End date, at 23:59:59
                };
            }

            const response = await this.prismaService.meterData.findMany({
                where: whereCondition,
                take: limit,
                orderBy: {
                    timestamp: 'asc',
                },
            });

            return mapResponse(response);
        } catch (e) {
            return [];
        }
    }
}
