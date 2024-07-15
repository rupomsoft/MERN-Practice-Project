import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Postman from "../components/Postman";

const PostmanPage = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Postman />
        </Col>
      </Row>
    </Container>
  );
};

export default PostmanPage;
