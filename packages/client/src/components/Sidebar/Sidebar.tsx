import {DownloadOutlined} from "@ant-design/icons";
import React from "react";
import {Layout, Menu} from "antd";

const {Sider, Content} = Layout;

const Sidebar = () => {
  return (
    <Sider trigger={null}>
      <div className="demo-logo-vertical"/>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: 'Reports',
            label: 'Reports',
            icon: <DownloadOutlined rev={''}/>,
          },
        ]}
      />
    </Sider>
  )
}

export default Sidebar;
