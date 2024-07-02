import jsPDF from "jspdf";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Pdfimg = () => {
  const [photos, setPhotos] = useState([]);
  const [paperSize, setPaperSize] = useState("a4");
  const [marginSize, setMarginSize] = useState("normal");
  const [imagePosition, setImagePosition] = useState("cover");

  const onChangePhoto = (e) => {
    setPhotos([...photos, ...e.target.files]);
  };

  const removePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const getPageDimensions = () => {
    const dimensions = {
      a4: { width: 595.28, height: 841.89 },
      letter: { width: 612, height: 792 },
      legal: { width: 612, height: 1008 },
      tabloid: { width: 792, height: 1224 },
      executive: { width: 522, height: 756 },
    };
    return dimensions[paperSize];
  };

  const getMarginSize = () => {
    const margins = {
      normal: 20,
      narrow: 10,
      moderate: 15,
    };
    return margins[marginSize];
  };

  const pdfGenerate = () => {
    const { width, height } = getPageDimensions();
    const margin = getMarginSize();
    var doc = new jsPDF("p", "pt", paperSize);

    photos.forEach((photo, index) => {
      var img = URL.createObjectURL(photo);
      if (index !== 0) {
        doc.addPage();
      }

      // Calculate position based on the selected image position
      let x = margin;
      let y = margin;
      let imgWidth = width - 2 * margin;
      let imgHeight = height - 2 * margin;

      switch (imagePosition) {
        case "top":
          y = margin;
          imgHeight = (height - 2 * margin) / 2;
          break;
        case "center":
          y = (height - imgHeight) / 2;
          break;
        case "bottom":
          y = height - imgHeight - margin;
          break;
        case "cover":
          // Stretch to cover the entire page
          x = 0;
          y = 0;
          imgWidth = width;
          imgHeight = height;
          break;
        case "stretch":
          // Stretch image to fit within margins
          imgWidth = width - 2 * margin;
          imgHeight = height - 2 * margin;
          break;
        default:
          break;
      }

      doc.addImage(img, null, x, y, imgWidth, imgHeight, null, "FAST");
    });

    doc.save(`photos.pdf`);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Image to PDF</h2>

      <Row className="mt-3">
        <Col lg={3}>
          {photos.map((photo, index) => (
            <div key={index}>
              <img
                alt={`photo-${index}`}
                width="250"
                height="250"
                className="rounded-circle shadow image-fit"
                src={URL.createObjectURL(photo)}
              />
              <br />
              <Button variant="danger" onClick={() => removePhoto(index)}>
                Remove
              </Button>
              <br />
              <br />
            </div>
          ))}
        </Col>
        <Col lg={4}>
          <Form.Group className="mt-5">
            <Form.Control
              multiple
              type="file"
              name="photo"
              onChange={onChangePhoto}
              accept="image/png, image/jpeg, image/jpg"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Paper Size</Form.Label>
            <Form.Control
              as="select"
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
            >
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
              <option value="legal">Legal</option>
              <option value="tabloid">Tabloid</option>
              <option value="executive">Executive</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Margin Size</Form.Label>
            <Form.Control
              as="select"
              value={marginSize}
              onChange={(e) => setMarginSize(e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="narrow">Narrow</option>
              <option value="moderate">Moderate</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Image Position</Form.Label>
            <Form.Control
              as="select"
              value={imagePosition}
              onChange={(e) => setImagePosition(e.target.value)}
            >
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
              <option value="cover">Cover</option>
              <option value="stretch">Stretch</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Button
            className="mt-5"
            variant="primary"
            onClick={pdfGenerate}
            disabled={photos.length === 0}
          >
            Download PDF
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Pdfimg;
