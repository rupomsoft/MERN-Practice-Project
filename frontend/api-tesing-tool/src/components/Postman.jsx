import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import ReactJson from "react-json-view";

const App = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [contentType, setContentType] = useState("JSON");
  const [authType, setAuthType] = useState("noAuth");
  const [bearerToken, setBearerToken] = useState("");
  const [basicAuth, setBasicAuth] = useState({ username: "", password: "" });
  const [customAuth, setCustomAuth] = useState({ header: "", value: "" });
  const [response, setResponse] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState(null);
  const [error, setError] = useState(null);
  const [requestTab, setRequestTab] = useState("content");
  const [resultTab, setResultTab] = useState("response");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [size, setSize] = useState("");

  const handleSendRequest = async () => {
    const startTime = Date.now();
    try {
      let parsedHeaders = headers ? JSON.parse(headers) : {};

      // Set content type header based on selected content type
      switch (contentType) {
        case "FORM_URLENCODED":
          parsedHeaders["Content-Type"] = "application/x-www-form-urlencoded";
          break;
        case "JSON":
          parsedHeaders["Content-Type"] = "application/json";
          break;
        case "HTML":
          parsedHeaders["Content-Type"] = "text/html";
          break;
        case "XML":
          parsedHeaders["Content-Type"] = "application/xml";
          break;
        case "TEXT":
          parsedHeaders["Content-Type"] = "text/plain";
          break;
        default:
          break;
      }

      // Set authentication headers
      switch (authType) {
        case "bearerToken":
          parsedHeaders["Authorization"] = `Bearer ${bearerToken}`;
          break;
        case "basicAuth":
          parsedHeaders["Authorization"] =
            "Basic " + btoa(`${basicAuth.username}:${basicAuth.password}`);
          break;
        case "customAuth":
          parsedHeaders[customAuth.header] = customAuth.value;
          break;
        default:
          break;
      }

      const options = {
        method,
        url,
        headers: parsedHeaders,
        data: ["POST", "PUT", "PATCH"].includes(method) ? body : undefined,
      };

      const res = await axios(options);
      const endTime = Date.now();
      setResponse(res.data);
      setResponseHeaders(res.headers);
      setStatus(`${res.status}`);
      setTime(`${endTime - startTime} ms`);
      setSize(`${JSON.stringify(res.data).length / 1024} kb`);
      setError(null);
      setResultTab("response");
    } catch (err) {
      const endTime = Date.now();
      setResponse(null);
      setResponseHeaders(null);
      setStatus(`${err?.response?.status}`);
      setTime(`${endTime - startTime} ms`);
      setSize("0 kb");
      setError(err?.response);
      setResultTab("error");
    }
  };

  const formattedRequest = () => {
    try {
      const parsedHeaders = headers ? JSON.parse(headers) : {};
      const headerLines = Object.entries(parsedHeaders).map(
        ([key, value]) => `${key}: ${value}`
      );
      const requestLine = `${method} ${url} HTTP/1.1`;
      return [requestLine, ...headerLines].join("\n");
    } catch {
      return "";
    }
  };

  return (
    <Container>
      <h1 className="my-4 text-center">React ReqBin</h1>
      <Form>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
              <option value="HEAD">HEAD</option>
              <option value="OPTIONS">OPTIONS</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={handleSendRequest}>
              Send
            </Button>
          </Col>
        </Row>
        <Tabs
          activeKey={requestTab}
          onSelect={(k) => setRequestTab(k)}
          className="mb-3"
        >
          <Tab eventKey="content" title="Content">
            {(method === "POST" || method === "PUT" || method === "PATCH") && (
              <>
                <Form.Group className="mt-3">
                  <Form.Label>Content Type</Form.Label>
                  <Form.Select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                  >
                    <option value="FORM_URLENCODED">
                      FORM URL Encoded (application/x-www-form-urlencoded)
                    </option>
                    <option value="JSON">JSON (application/json)</option>
                    <option value="HTML">HTML (text/html)</option>
                    <option value="XML">XML (application/xml)</option>
                    <option value="TEXT">TEXT (text/plain)</option>
                    <option value="CUSTOM">CUSTOM</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
          </Tab>
          <Tab eventKey="authorization" title="Authorization">
            <Form.Group className="mt-3">
              <Form.Check
                type="radio"
                name="authOption"
                id="noAuth"
                label="No Auth"
                value="noAuth"
                checked={authType === "noAuth"}
                onChange={(e) => setAuthType(e.target.value)}
              />
              <Form.Check
                type="radio"
                name="authOption"
                id="bearerToken"
                label="Bearer Token"
                value="bearerToken"
                checked={authType === "bearerToken"}
                onChange={(e) => setAuthType(e.target.value)}
              />
              {authType === "bearerToken" && (
                <Form.Group className="mt-3">
                  <Form.Label>Token</Form.Label>
                  <Form.Control
                    type="text"
                    value={bearerToken}
                    onChange={(e) => setBearerToken(e.target.value)}
                  />
                </Form.Group>
              )}
              <Form.Check
                type="radio"
                name="authOption"
                id="basicAuth"
                label="Basic Auth"
                value="basicAuth"
                checked={authType === "basicAuth"}
                onChange={(e) => setAuthType(e.target.value)}
              />
              {authType === "basicAuth" && (
                <>
                  <Form.Group className="mt-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={basicAuth.username}
                      onChange={(e) =>
                        setBasicAuth({
                          ...basicAuth,
                          username: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={basicAuth.password}
                      onChange={(e) =>
                        setBasicAuth({
                          ...basicAuth,
                          password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </>
              )}
              <Form.Check
                type="radio"
                name="authOption"
                id="customAuth"
                label="Custom"
                value="customAuth"
                checked={authType === "customAuth"}
                onChange={(e) => setAuthType(e.target.value)}
              />
              {authType === "customAuth" && (
                <>
                  <Form.Group className="mt-3">
                    <Form.Label>Header</Form.Label>
                    <Form.Control
                      type="text"
                      value={customAuth.header}
                      onChange={(e) =>
                        setCustomAuth({ ...customAuth, header: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                      type="text"
                      value={customAuth.value}
                      onChange={(e) =>
                        setCustomAuth({ ...customAuth, value: e.target.value })
                      }
                    />
                  </Form.Group>
                </>
              )}
            </Form.Group>
          </Tab>
          <Tab eventKey="headers" title="Headers">
            <Form.Group className="mt-3">
              <Form.Label>Headers</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder='{"Content-Type": "application/json"}'
              />
            </Form.Group>
          </Tab>
          <Tab eventKey="raw" title="Raw">
            <Form.Group className="mt-3">
              <Form.Label>Raw Request</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={formattedRequest()}
                readOnly
              />
            </Form.Group>
          </Tab>
        </Tabs>
      </Form>
      <hr />
      <h5 className="d-flex mb-3 py-1">
        <span className="text-muted">Status:</span>
        <span className="ml-2" style={{ color: "#278800" }}>
          {status}
        </span>
        <span className="text-muted ml-3 ms-2">Time:</span>
        <span className="ml-2" style={{ color: "#278800" }}>
          {time}
        </span>
        <span className="text-muted ml-3 ms-2">Size:</span>
        <span className="ml-2" style={{ color: "#278800" }}>
          {size}
        </span>
      </h5>
      <Tabs
        activeKey={resultTab}
        onSelect={(k) => setResultTab(k)}
        className="mt-4"
      >
        <Tab eventKey="response" title="Response">
          {response && <ReactJson src={response} theme="monokai" />}
        </Tab>
        <Tab eventKey="headers" title="Headers">
          {responseHeaders && (
            <ReactJson src={responseHeaders} theme="monokai" />
          )}
        </Tab>
        <Tab eventKey="error" title="Error">
          {error && <ReactJson src={error} theme="monokai" />}
        </Tab>
        <Tab eventKey="raw" title="Raw">
          {response && (
            <Card>
              <Card.Body>
                <pre>{JSON.stringify(response, null, 2)}</pre>
              </Card.Body>
            </Card>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
