import {Injectable} from '@nestjs/common';
import {PrismaService} from '~/prisma.service';

interface Tag {
    muid: string;
    quality: string;
}

interface MetricData {
    measurement: string;
    timestamp: string;
    tags: Tag[];
    value: number;
}

@Injectable()
export class MetricsService {
    constructor(private readonly prismaService: PrismaService) {
    }



    async getMetricsInRangeByOrganization(organizationNames: string, aggregateBy: string) {

    }
}
