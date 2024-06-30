import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CodeEditor from "../components/CodeEditor";

const CodeEditorPage = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <CodeEditor />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditorPage;
