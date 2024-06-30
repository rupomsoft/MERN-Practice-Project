// src/ExcelFileReaderPage.js

import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Table } from "react-bootstrap";
import * as XLSX from "xlsx";

const ExcelFileReaderPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const binaryStr = e.target.result;
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          setData(jsonData);
          setError(null);
        } catch (err) {
          setError(
            "Failed to read the Excel file. Please make sure the file is valid."
          );
          setData([]);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Excel File Reader</Form.Label>
            <Form.Control
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
          {data.length > 0 && (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ExcelFileReaderPage;
