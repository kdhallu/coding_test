import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Button, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs
import type { MenuInfo } from 'rc-menu/lib/interface';

const { RangePicker } = DatePicker;

interface DateRange {
    label: string;
    range: [Dayjs, Dayjs]; // Change to Dayjs
}

interface Props {
    onRangeSelect: (range: (string | undefined)[]) => void; // Specify the expected parameter type
}

const RangeDropdown = ({ onRangeSelect }: Props) => {
    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState(false); // State to control dropdown visibility
    const formatRange = () => {
       const start = selectedRange?.range[0].format('YYYY-MM-DD')
       const stop = selectedRange?.range[1].format('YYYY-MM-DD')

        return [
            start,
            stop
        ]

    }
    useEffect(() => {
        onRangeSelect(formatRange());
    }, [onRangeSelect, selectedRange]);

    const handleMenuClick = (info: MenuInfo) => {
        switch (info.key) {
            case '1_month':
                setSelectedRange({
                    label: 'Last 1 Month',
                    range: [dayjs().subtract(1, 'months').startOf('day'), dayjs().endOf('day')],
                });
                setDropdownVisible(false); // Close dropdown
                break;
            case '3_months':
                setSelectedRange({
                    label: 'Last 3 Months',
                    range: [dayjs().subtract(3, 'months').startOf('day'), dayjs().endOf('day')],
                });
                setDropdownVisible(false); // Close dropdown
                break;
            case '6_months':
                setSelectedRange({
                    label: 'Last 6 Months',
                    range: [dayjs().subtract(6, 'months').startOf('day'), dayjs().endOf('day')],
                });
                setDropdownVisible(false); // Close dropdown
                break;
            default:
                break;
        }
    };

    // Adjusted function signature to match Ant Design's expected types
    const handleCustomRangeChange = (dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string]) => {
        if (dates[0] && dates[1]) {
            setSelectedRange({
                label: 'Custom Range',
                range: [dates[0], dates[1]] as [Dayjs, Dayjs], // Ensure the dates are cast correctly
            });
            handleVisibleChange(false)
        }
    };

    const handleVisibleChange = (visible: boolean) => {
        setDropdownVisible(visible);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1_month">Last 1 Month</Menu.Item>
            <Menu.Item key="3_months">Last 3 Months</Menu.Item>
            <Menu.Item key="6_months">Last 6 Months</Menu.Item>
            <Menu.Item key="custom_range" className="custom-range">
                <RangePicker
                    //@ts-ignore
                    onChange={handleCustomRangeChange} // This will now accept the correct types
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                />
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Dropdown overlay={menu} trigger={['click']} visible={dropdownVisible} onVisibleChange={handleVisibleChange}>
                <Button>
                    {selectedRange ? selectedRange.label : 'Select Date Range'} <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    );
};

export default RangeDropdown;
