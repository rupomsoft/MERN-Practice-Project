import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Products from "../components/Products";

const BarCodeScannerPage = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Products />
        </Col>
      </Row>
    </Container>
  );
};

export default BarCodeScannerPage;
