import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Player } from "video-react";
import gitX from "../assets/images/gitX.jpg";
const MediaPlayerPage = () => {
  const [input, setInput] = useState(
    "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  );
  const [fileUrl, setFileUrl] = useState(
    "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  );

  return (
    <Container>
      <Row className="py-5">
        <Col className="col-md-6 offset-md-3">
          <h1>Media Player</h1>
          <Form>
            <Form.Group>
              <Form.Label for="inputVideoUrl">Video Url</Form.Label>
              <Form.Control
                name="inputVideoUrl"
                id="inputVideoUrl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Button type="button" onClick={() => setFileUrl(input)}>
                Update
              </Button>
            </Form.Group>
          </Form>

          <Player autoPlay playsInline poster={gitX} src={fileUrl} />
        </Col>
      </Row>
    </Container>
  );
};

export default MediaPlayerPage;
