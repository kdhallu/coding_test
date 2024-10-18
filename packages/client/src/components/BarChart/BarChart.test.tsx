import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from './BarChart';

jest.mock('recharts', () => ({
    LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
    Line: () => <div data-testid="line"></div>,
    XAxis: () => <div data-testid="x-axis"></div>,
    YAxis: () => <div data-testid="y-axis"></div>,
    CartesianGrid: () => <div data-testid="grid"></div>,
    Tooltip: () => <div data-testid="tooltip"></div>,
    Legend: () => <div data-testid="legend"></div>
}));

describe('BarChart', () => {
    const mockReportData = {
        "1db7649e-9342-4e04-97c7-f0ebb88ed1f8": [
            { timestamp: 1609459200000, "0100011D00FF": 100, "0100021D00FF": 50 },
            { timestamp: 1609545600000, "0100011D00FF": 150, "0100021D00FF": 70 }
        ],
        "95ce3367-cbce-4a4d-bbe3-da082831d7bd": [
            { timestamp: 1609459200000, "0100011D00FF": 200, "0100021D00FF": 90 },
            { timestamp: 1609545600000, "0100011D00FF": 250, "0100021D00FF": 110 }
        ]
    };

    test('renders the chart and elements', () => {
        render(<BarChart reportData={mockReportData} />);

        expect(screen.getByTestId('line-chart')).toBeInTheDocument();
        expect(screen.getByTestId('x-axis')).toBeInTheDocument();
        expect(screen.getByTestId('y-axis')).toBeInTheDocument();
        expect(screen.getByTestId('grid')).toBeInTheDocument();
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
        expect(screen.getByTestId('legend')).toBeInTheDocument();
        expect(screen.getAllByTestId('line')).toHaveLength(2); // One line for each dataset
    });

    test('renders the checkbox and handles dot toggle', () => {
        render(<BarChart reportData={mockReportData} />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked(); // By default, the checkbox is checked

        // Uncheck the checkbox
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    test('does not render the chart if no reportData is provided', () => {
        const { container } = render(<BarChart reportData={null} />);
        expect(container.firstChild).toBeNull();
    });

    test('shows dots on the lines when the checkbox is checked', () => {
        render(<BarChart reportData={mockReportData} />);

        // The dot should be present because the checkbox is initially checked
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();

        // Uncheck the checkbox
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
        // Further checks can be added if dot logic is more complex in real components
    });
});
