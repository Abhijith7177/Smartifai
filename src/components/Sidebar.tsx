import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  InteractionOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface SidebarProps {
  small: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ small }) => {
  console.log("🚀 ~ small:", small);
  const location = useLocation();

  return (
    <Sider
      width={small ? "100%" : 200}
      style={{
        backgroundColor: "#755AAE",
        height: small ? "100%" : "auto",
        borderTopRightRadius: "30px",
      }}>
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <h1
          style={{
            width: "100%",
            maxWidth: small ? "100%" : 200,
            marginBottom: 20,
            color: "white",
          }}>
          PLATFORM
        </h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{
          borderRight: 0,
          backgroundColor: "#755AAE",
          fontSize: "16px",
        }}>
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/connect" icon={<SettingOutlined />}>
          Connect
        </Menu.Item>
        <Menu.Item key="/report" icon={<InteractionOutlined />}>
          Report
        </Menu.Item>
        <Menu.Item key="/settings" icon={<InteractionOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
