import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AreaChartComponent from "../components/AreaChart";
import BarChartComponent from "../components/BarChart";
import ComposedChartComponent from "../components/ComposedChart";
import LineChartRechart from "../components/LineChartRechart";
import PieChartComponent from "../components/PieChart";
import RadarChartComponent from "../components/RadarChart";
import RadialBarChartComponent from "../components/RadialBarChart";
import ScatterChartComponent from "../components/ScatterChart";

const RechartsPage = () => (
  <Container>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>Simple Line Chart</Card.Header>
          <Card.Body>
            <LineChartRechart />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>Bar Chart</Card.Header>
          <Card.Body>
            <BarChartComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>Pie Chart</Card.Header>
          <Card.Body>
            <PieChartComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>Area Chart</Card.Header>
          <Card.Body>
            <AreaChartComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>Composed Chart</Card.Header>
          <Card.Body>
            <ComposedChartComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>Scatter Chart</Card.Header>
          <Card.Body>
            <ScatterChartComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>Radar Chart</Card.Header>
          <Card.Body>
            <RadarChartComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Header>Radial Bar Chart</Card.Header>
          <Card.Body>
            <RadialBarChartComponent />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default RechartsPage;
