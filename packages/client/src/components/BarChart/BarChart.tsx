import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

interface ChartData {
  [key: string]: any; // or use a more specific type if known
}

type MonthlyData = {
  [month: string]: string; // Each month has a string value
};

type CompanyData = {
  [companyName: string]: MonthlyData; // Company name as key, MonthlyData as value
};

type ReportsData = {
  [companyName: string]: CompanyData; // Overall structure containing company data
};

// Transform data to group it by month, with each company's values for that month
const transformForChart = (groupedData: ReportsData) => {
  const chartData: ChartData = {};

  // Collect all months from all companies
  Object.keys(groupedData).forEach(company => {
    Object.keys(groupedData[company]).forEach(month => {
      if (!chartData[month]) {
        chartData[month] = {month};  // Initialize with the month key
      }
      chartData[month][company] = groupedData[company][month];  // Assign company value for the month
    });
  });

  // Convert the object into an array for the chart
  return Object.values(chartData);
};

const ChartComponent = ({reportData}: { reportData: ReportsData }) => {
  if (!reportData) {
    return null;
  }

  const chartData = transformForChart(reportData);
  const companies = Object.keys(reportData);  // Extract company names from the data

  return (
    <LineChart
      width={800}
      height={400}
      data={chartData}
      margin={{top: 20, right: 30, left: 20, bottom: 5}}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="month"/>
      <YAxis/>
      <Tooltip/>
      <Legend/>

      {/* Generate a Line for each company */}
      {companies.map((company, index) => (
        <Line
          key={company}
          type="monotone"
          dataKey={company}
          stroke={getRandomColor(index)}
          activeDot={{r: 8}}
        />
      ))}
    </LineChart>
  );
};

// Helper function to get a random color for each company
const getRandomColor = (index: number) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000', '#00C49F'];
  return colors[index % colors.length];
};

export default ChartComponent;
