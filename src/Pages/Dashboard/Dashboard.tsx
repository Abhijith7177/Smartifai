import React, { useEffect, useState } from "react";
import {
  Layout,
  Tabs,
  Card,
  Row,
  Col,
  Dropdown,
  Menu,
  DatePicker,
  Button,
  Typography,
} from "antd";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [expandedCard, setExpandedCard] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  const handleCardClick = (index: any) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://api.weatherapi.com/v1/forecast.json?key=66e6490dbf1e4a279ea160129240706&q=usa&days=3&aqi=no&alerts=no"
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  );

  const cards = [
    { title: "Total Views", value: 45 },
    { title: "Metrics 03", value: "$0.3" },
    { title: "Total Clicks", value: 30 },
    { title: "Number of Viewers", value: 27 },
    { title: "Number of Viewers", value: 27 },
    { title: "Number of Viewers", value: 27 },
  ];

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header className="header">
          <Tabs defaultActiveKey="1" onChange={handleTabChange}>
            <TabPane tab="Overall" key="1" />
            <TabPane tab="Platform 01" key="2" />
            <TabPane tab="Platform 02" key="3" />
            <TabPane tab="Platform 03" key="4" />
          </Tabs>
        </Header>
        <Row
          justify="space-between"
          align="middle"
          className="top-bar"
          style={{ flexDirection: "column", gap: "20px", marginTop: "10px" }}>
          <Col>
            <DatePicker.RangePicker
              style={{
                width: "100%",
                borderRadius: "20px",
                backgroundColor: "#eb5b2f70",
              }}
            />
          </Col>
          <Col style={{ width: "100%" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button style={{ width: "100%", borderRadius: "20px" }}>
                Select Account <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <Content className="content">
        {activeTab === "2" && (
          <div className="metrics-container">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`metric-card  ${
                  expandedCard === index ? "expanded" : ""
                }`}
                onClick={() => handleCardClick(index)}>
                {<EyeOutlined className="icon" />}
                <h4>{card.title}</h4>
                <h1>{card.value}</h1>
                {/* {card.extraValue && <h1>{card.extraValue}</h1>} */}
              </div>
            ))}
            <div className={`metric-card fixed-span`}>
              <h4>Hello</h4>
              <h1>ffffffff</h1>
            </div>
          </div>
        )}
        {activeTab !== "2" && (
          <div className="placeholder-container">
            <Title level={3}>Content for other tabs</Title>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Dashboard;
