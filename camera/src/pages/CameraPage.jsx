import React, { useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const CameraPage = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <Container>
      <Row className="py-5">
        <Col className="col-md-6 offset-md-3">
          <h3>Webcam Camera</h3>
          <hr />
          <Webcam
            ref={webcamRef}
            audio={true}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
          />
          <Button onClick={capturePhoto} className="mr-2">
            Capture
          </Button>
          <Button variant="secondary" onClick={() => setUrl(null)}>
            Refresh
          </Button>

          {url && (
            <div className="my-3">
              <img src={url} alt="Screenshot" />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CameraPage;
