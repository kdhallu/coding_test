import { Layout, Space, theme } from 'antd';
import SideBar from '../components/Sidebar';
import Header from '../components/Header';
import useMetrics from '../hooks/useMetrics';
import BarChart from '../components/BarChart';
import RangeDropdown from '../components/RangeDropdown';
import { useEffect, useState } from 'react';
import { meters } from '../const';
import Spinner from '../components/Spinner';
import MetersDropdown from "../components/MetersDropdown";

const { Content } = Layout;

const meterIds = Object.values(meters);

const Report = () => {
    const { metersData, fetchMeterDataByMeterId, isLoading } = useMetrics();
    const [range, setRange] = useState<(string | undefined)[]>([undefined]); // Add initial value as [undefined]
    const [meterSelection, setMetersSelection] = useState<string[]>([]);

    // Fetch meter data when component mounts or when range changes
    useEffect(() => {

        fetchMeterDataByMeterId(meterSelection, range);
    }, [range, meterSelection]); // Add fetchMeterDataByMeterId to dependencies to avoid stale closures

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <SideBar />
            <Layout>
                <Header />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                    className="content-container"
                >
                    <Space size="large">
                        <MetersDropdown onMeterSelection={setMetersSelection} />
                        <RangeDropdown onRangeSelect={setRange} />
                    </Space>

                    <div className="chart-container" style={{
                        minHeight: "100vh",
                        marginTop: "100px"
                    }}>
                        {isLoading ? <Spinner /> : <BarChart reportData={metersData} />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Report;
