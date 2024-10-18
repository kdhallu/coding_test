import { Button, Checkbox, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { meters } from "../../const";
import {useEffect, useState} from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface Props {
    onMeterSelection: (meterIds: string[]) => void
}
// todo: I have hidden the meter dropdown as it was increasing complexity.
const MetersDropdown = (props: Props) => {

    const [selectedMeters, setSelectedMeters] = useState<string[]>([]);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false); // Control dropdown visibility

    // Handle meter selection for multiple checkboxes
    const handleMeterSelection = (e: CheckboxChangeEvent, meter: string) => {
        const checked = e.target.checked;
        if (checked) {
            setSelectedMeters(prevSelected => [...prevSelected, meter]);
        } else {
            setSelectedMeters(prevSelected => prevSelected.filter(item => item !== meter));
        }
    };

    // Handle dropdown visibility change
    const handleVisibleChange = (visible: boolean) => {
        setDropdownVisible(visible);
    };

    // Close dropdown on "Done" button click
    const handleDone = () => {
        props.onMeterSelection(selectedMeters.map((meter) => meters[meter]))
        setDropdownVisible(false); // Close the dropdown
    };

    const MeterDropdown = (
        <Menu>
            {Object.keys(meters).map((meter) => (
                <Menu.Item key={meter}>
                    <Checkbox
                        checked={selectedMeters.includes(meter)} // Check if meter is selected
                        onChange={e => handleMeterSelection(e, meter)} // Handle selection
                    >
                        {meter}
                    </Checkbox>
                </Menu.Item>
            ))}
            <br/>
            <Button onClick={handleDone}>Done</Button> {/* Close dropdown when clicked */}
        </Menu>
    );

    return (
        <Dropdown
            overlay={MeterDropdown}
            visible={dropdownVisible} // Control visibility with state
            onVisibleChange={handleVisibleChange} // Handle visibility changes
            trigger={['click']}
        >
            <Button>
                {selectedMeters.length > 0 ? selectedMeters.join(', ') : 'Select Meters'} <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default MetersDropdown;
