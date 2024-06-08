import React, { useState } from "react";
import { Layout, Row, Col, Typography, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

interface DataItem {
  label: string;
  value: string;
  color?: string;
}

const AppHeader: React.FC = () => {
  // State to store the current data type (Daily, Monthly, Weekly)
  const [dataType, setDataType] = useState<string>("Daily");

  // Data objects for each data type
  const data: { [key: string]: DataItem[] } = {
    Daily: [
      { label: "Total Earnings", value: "$54.36" },
      { label: "Total Spent", value: "$120", color: "red" },
      { label: "Total Posts", value: "120" },
    ],
    Weekly: [
      { label: "Total Earnings", value: "$300" },
      { label: "Total Spent", value: "$500", color: "red" },
      { label: "Total Posts", value: "600" },
    ],
    Monthly: [
      { label: "Total Earnings", value: "$1000" },
      { label: "Total Spent", value: "$1500", color: "red" },
      { label: "Total Posts", value: "2000" },
    ],
  };

  // Menu options with callbacks to update the data type
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setDataType("Daily")}>
        Daily
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setDataType("Weekly")}>
        Weekly
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setDataType("Monthly")}>
        Monthly
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="app-header">
      <Row justify="space-between" align="middle">
        <Col>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Text className="header-text">
              {dataType} <DownOutlined style={{ marginLeft: "40px" }} />
            </Text>
          </Dropdown>
        </Col>
        {data[dataType].map((item, index) => (
          <Col key={index}>
            <Text className="header-text" style={{ color: item.color }}>
              {item.label} <Text className="header-text">{item.value}</Text>
            </Text>
          </Col>
        ))}
      </Row>
    </Header>
  );
};

export default AppHeader;
