import QRCode from "qrcode.react";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const QrcodePage = () => {
  const [input, setInput] = useState("https://rabbil.com");

  const downloadImage = async (e) => {
    const canvas = document.querySelector("canvas");
    const imageDataURI = canvas.toDataURL("png", 1.0);
    const blob = await (await fetch(imageDataURI)).blob();
    const URL = window.URL.createObjectURL(blob);
    const el = document.createElement("a");
    el.href = URL;
    el.download = "myqrcode.png";
    el.click();
    window.URL.revokeObjectURL(URL);
  };

  return (
    <Container>
      <Row className="py-5">
        <Col className="col-md-6 offset-md-3">
          <h1>QR Code Generator</h1>
          <input
            type="url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control"
            placeholder="Write something to generate qr code"
          />
          {input && (
            <>
              <section>
                <QRCode
                  value={input}
                  size={200}
                  level="M"
                  className="mt-4 mb-3"
                />
              </section>
              <Button onClick={downloadImage}>Download image</Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default QrcodePage;
