import { Button, Checkbox, Dropdown, Layout, Menu, Space, theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SideBar from '../components/Sidebar';
import Header from '../components/Header';
const { Content } = Layout;


const Report = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const CompaniesDropdown = (
        <Menu>
            <Menu.Item>
                <Checkbox>
                    Option 1
                </Checkbox>
            </Menu.Item>
        </Menu>

    );

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
                        <Dropdown overlay={CompaniesDropdown}>
                            <Button>
                                Select Company <DownOutlined rev={''} />
                            </Button>
                        </Dropdown>

                    </Space>

                    <div className="chart-container">

                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Report;
