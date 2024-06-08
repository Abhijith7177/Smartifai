import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { IRouterParams } from "../interfaces/interface";
import { Button, Layout, Drawer, Badge, Avatar } from "antd";
import { BellOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";
import Header from "./Header";
const { Content } = Layout;

const PrivateLayout: React.FC<IRouterParams> = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        borderTopRightRadius: "20px",
      }}>
      {isSmallScreen ? (
        <>
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              zIndex: 1000,
            }}
          />
          <Drawer
            placement="left"
            closable={true}
            style={{ backgroundColor: "#755AAE", borderTopRightRadius: "20px" }}
            onClose={toggleDrawer}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}>
            <Sidebar small={true} />
          </Drawer>
        </>
      ) : (
        <Sidebar small={false} />
      )}
      <Layout>
        <div
          style={{
            marginLeft: "auto",
            marginRight: isSmallScreen ? "20px" : "100px",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
          }}>
          <Badge>
            <BellOutlined
              style={{ fontSize: 20, marginRight: 20, color: "black" }}
            />
          </Badge>
          <Avatar
            src="path_to_your_image"
            style={{
              backgroundColor: "transparent",
              verticalAlign: "middle",
              borderColor: " #efa797",
            }}
            size="small"
          />
        </div>
        <Header />
        <Content
          style={{
            padding: isSmallScreen ? "20px" : "100px",
            paddingTop: !isSmallScreen ? "20px" : "100px",
            position: "relative",
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
