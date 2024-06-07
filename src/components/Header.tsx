import { Layout, Row, Col, Typography, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
  </Menu>
);

const AppHeader = () => {
  return (
    <Header className="app-header">
      <Row justify="space-between" align="middle">
        <Col>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Text className="header-text">
              Daily <DownOutlined style={{ marginLeft: "40px" }} />
            </Text>
          </Dropdown>
        </Col>
        <Col>
          <Text className="header-text">
            Total Earnings <Text className="header-text">$54.36</Text>
          </Text>
        </Col>
        <Col>
          <Text className="header-text">
            Total Spent <Text className="header-text red">$120</Text>
          </Text>
        </Col>
        <Col>
          <Text className="header-text">
            Total Posts <Text className="header-text">120</Text>
          </Text>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
