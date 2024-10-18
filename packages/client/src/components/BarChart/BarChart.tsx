import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Checkbox } from 'antd';

// Helper to transform the raw data from your file to chart-compatible format
const transformForChart = (data: any[]) => {
    return data?.map(entry => ({
        timestamp: new Date(entry.timestamp).toLocaleString(), // X-axis: formatted timestamp
        solarEnergyOutput: entry["0100011D00FF"], // Y-axis: energy reading
        costPerCent: entry["0100021D00FF"]
    }));
};

const ChartComponent = ({ reportData }: { reportData: any }) => {
    const [showDots, setShowDots] = useState(true);

    if (!reportData) {
        return null;
    }

    // Transform the data for both datasets (assuming reportData is a 2D array)
    const solarMeterReadingsData = transformForChart(reportData["1db7649e-9342-4e04-97c7-f0ebb88ed1f8"]);
    const costMeterReadingsData = transformForChart(reportData["95ce3367-cbce-4a4d-bbe3-da082831d7bd"]);

    const handleDotToggle = (e: any) => {
        setShowDots(e.target.checked); // Update state based on checkbox
    };

    return (
        <div>

            <Checkbox checked={showDots} onChange={handleDotToggle}>
                Show Dots
            </Checkbox>

            <LineChart
                width={1200}
                height={400}
                data={solarMeterReadingsData} // Use data from the first dataset for X-axis
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                    type="monotone"
                    dataKey="costPerCent"
                    stroke="#8884d8"
                    dot={showDots}
                    activeDot={showDots ? { r: 8 } : false}
                />

                <Line
                    type="monotone"
                    data={costMeterReadingsData}
                    dataKey="solarEnergyOutput"
                    stroke="#82ca9d"
                    dot={showDots}
                    activeDot={showDots ? { r: 8 } : false}
                />
            </LineChart>
        </div>
    );
};

export default ChartComponent;
