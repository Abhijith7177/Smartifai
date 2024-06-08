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
  Carousel,
} from "antd";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import Loader from "../../components/Loader";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Title } = Typography;

interface WeatherData {
  current: {
    temp_c: number;
    temp_f: number;
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        avgtemp_c: number;
        avgtemp_f: number;
        maxtemp_c: number;
        mintemp_c: number;
      };
    }>;
  };
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [activeChartIndex, setActiveChartIndex] = useState(0);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const today = new Date();
  const fifteenDaysFromToday = new Date();
  fifteenDaysFromToday.setDate(today.getDate() + 15);

  const handleTabChange = (key: any) => {
    setActiveTab(key);
    handleTabClick(key);
  };

  const handleCardClick = (index: any) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  );

  const menu1 = (
    <Menu>
      <Menu.Item key="0">Daily</Menu.Item>
      <Menu.Item key="1">Weekly</Menu.Item>
      <Menu.Item key="2">Montly </Menu.Item>
    </Menu>
  );

  const handleTabClick = async (key: string) => {
    let apiUrl = "";
    switch (key) {
      case "2":
        apiUrl =
          "http://api.weatherapi.com/v1/forecast.json?key= 66e6490dbf1e4a279ea160129240706&q=usa&days=100&aqi=no&alerts=no";
        break;
      case "3":
        apiUrl =
          "http://api.weatherapi.com/v1/forecast.json?key= 66e6490dbf1e4a279ea160129240706&q=india&days=3&aqi=no&alerts=no";
        break;
      case "4":
        apiUrl =
          "http://api.weatherapi.com/v1/forecast.json?key= 66e6490dbf1e4a279ea160129240706&q=uk&days=3&aqi=no&alerts=no";
        break;
      default:
        break;
    }

    setLoading(true); // Set loading state to true when API call starts

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false); // Set loading state to false when API call finishes
    }
  };

  const cards: { title: string; value: number | undefined }[] = [
    { title: "Temperature (C)", value: weatherData?.current?.temp_c },
    { title: "Temperature (F)", value: weatherData?.current?.temp_f },
    { title: "Humidity", value: weatherData?.current?.humidity },
    { title: "Wind Speed (kph)", value: weatherData?.current?.wind_kph },
    { title: "Pressure (mb)", value: weatherData?.current?.pressure_mb },
    { title: "UV Index", value: weatherData?.current?.uv },
  ];

  const barChartData = [
    { title: "Temperature (C)", data: [20, 30, 25, 35, 40] },
    { title: "Temperature (F)", data: [30, 40, 35, 45, 50] },
    { title: "Humidity", data: [50, 60, 55, 65, 70] },
  ];

  const handleCarouselChange = (index: any) => {
    setActiveChartIndex(index);
  };

  return (
    <Layout>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="top-bar-wrapper">
        <Header className="header">
          <Tabs defaultActiveKey="1" onChange={handleTabChange}>
            <TabPane tab="Overall" key="1" />
            <TabPane tab="USA" key="2" />
            <TabPane tab="India" key="3" />
            <TabPane tab="UK" key="4" />
          </Tabs>
        </Header>
        <Row
          justify="space-between"
          align="middle"
          className="top-bar"
          style={{ flexDirection: "column", gap: "20px", marginTop: "10px" }}>
          <Col style={{ width: "100%" }}>
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
              <Button
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  borderColor: "#755AAE",
                  color: "#755AAE",
                }}>
                Select Account <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <Content className="">
        {loading ? ( // Render loader if loading state is true
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Loader />
          </div>
        ) : (
          // Render content when loading state is false
          activeTab !== "1" && (
            <div className="metrics-container">
              {cards.map(
                (
                  card: { title: string; value: number | undefined },
                  index: number
                ) => (
                  <div
                    key={index}
                    className={`metric-card  ${
                      expandedCard === index ? "expanded" : ""
                    }`}
                    onClick={() => handleCardClick(index)}>
                    {<EyeOutlined className="icon" />}
                    <div className={expandedCard === index ? "expand-1" : ""}>
                      <h4>{card.title}</h4>
                      <h1 style={{ color: "#755AAE" }}>{card.value}</h1>
                      {expandedCard === index && (
                        <Dropdown overlay={menu1} trigger={["click"]}>
                          <Button style={{ borderRadius: "20px" }}>
                            Daily
                            <DownOutlined />
                          </Button>
                        </Dropdown>
                      )}
                    </div>
                    {expandedCard === index && weatherData && (
                      <div>
                        <ReactApexChart
                          options={{
                            chart: {
                              id: "weather-chart",
                              toolbar: {
                                show: false, // Hide toolbar (which includes zoom and download buttons)
                              },
                            },

                            xaxis: {
                              categories: weatherData.forecast.forecastday
                                .map(day => {
                                  const date = new Date(day.date);
                                  const month = date.toLocaleString("default", {
                                    month: "short",
                                  });
                                  const dayOfMonth = date.getDate();
                                  return `${month} ${dayOfMonth}`;
                                })
                                .slice(0, 5), // Include only the first five formatted dates
                            },
                            fill: {
                              colors: ["#EFA797"], // Very light orange color
                            },
                            stroke: {
                              show: false, // Hide the stroke (line)
                            },
                            dataLabels: {
                              enabled: false, // Disable data labels
                            },
                          }}
                          series={[
                            {
                              name: "Temperature (C)",
                              data: weatherData.forecast.forecastday
                                .map(day => day.day.avgtemp_c)
                                .slice(0, 5), // Include only the first five temperature values
                            },
                          ]}
                          type="area"
                          height={225}
                        />
                      </div>
                    )}
                  </div>
                )
              )}
              <div className={`metric-card fixed-span`}>
                <h4 style={{ display: "flex" }}>Top Categories</h4>

                <Carousel autoplay>
                  {barChartData.map((chart, index) => (
                    <div key={index}>
                      <ReactApexChart
                        options={{
                          chart: {
                            id: `bar-chart-${index}`,
                            toolbar: { show: false },
                          },
                          plotOptions: {
                            bar: {
                              horizontal: true,
                            },
                          },
                          xaxis: {
                            categories: [
                              "Value 1",
                              "Value 2",
                              "Value 3",
                              "Value 4",
                              "Value 5",
                            ],
                          },
                          fill: {
                            type: "gradient",
                            gradient: {
                              shadeIntensity: 1,
                              opacityFrom: 0.7,
                              opacityTo: 0.9,
                              stops: [0, 100],
                              colorStops: [
                                {
                                  offset: 0,
                                  color: "#755AAE", // Start color
                                  opacity: 1,
                                },
                                {
                                  offset: 100,
                                  color: "#EFA797", // End color
                                  opacity: 1,
                                },
                              ],
                            },
                          },
                          stroke: {
                            width: 1,
                            colors: ["#755AAE"], // Vertical lines color
                          },
                          dataLabels: { enabled: false },
                        }}
                        series={[{ name: chart.title, data: chart.data }]}
                        type="bar"
                        height={225}
                      />
                    </div>
                  ))}
                </Carousel>

                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  {barChartData.map((_, index) => (
                    <span
                      key={index}
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        margin: "0 5px",
                        color: activeChartIndex === index ? "#1890ff" : "#ccc",
                      }}
                      onClick={() => setActiveChartIndex(index)}>
                      &#8226;
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
        {activeTab === "1" && (
          <div className="placeholder-container">
            <Title level={3}>Content for other tabs</Title>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Dashboard;
