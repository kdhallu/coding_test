import {useState} from "react";
import getReportByMeterId from '../data/query/reports/getReport';


const useMetrics = () => {
    const [metersData, setMetersData] = useState<{}>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const fetchMeterDataByMeterId = async (meterIds: string[], range: (string | undefined)[] | undefined) => {

        setIsLoading(true)

        const responses = await Promise.all(
            meterIds.map(async (meterId) => {
                const response = await getReportByMeterId(meterId, range);
                return {meterId, response};
            })
        );

        const metersData = responses.reduce((acc, {meterId, response}) => {
            acc[meterId] = response;
            return acc;
        }, {} as Record<string, any>);

        setMetersData(metersData);

        setIsLoading(false);
    }

    return {
        metersData,
        fetchMeterDataByMeterId,
        isLoading
    }

}

export default useMetrics;
