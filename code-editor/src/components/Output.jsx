import { useState } from "react";
import { Button, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      setToastMessage({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Output</p>
      <Button
        variant="outline-success"
        style={{ marginBottom: "1rem" }}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? <Spinner animation="border" size="sm" /> : "Run Code"}
      </Button>
      <div
        style={{
          height: "75vh",
          padding: "0.5rem",
          color: isError ? "red" : "",
          border: "1px solid",
          borderRadius: "0.25rem",
          borderColor: isError ? "red" : "#333",
          overflowY: "auto",
        }}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>

      <ToastContainer position="top-end" className="p-3">
        {toastMessage && (
          <Toast
            onClose={() => setToastMessage(null)}
            show={true}
            delay={6000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">
                {toastMessage?.title || "title"}
              </strong>
            </Toast.Header>
            <Toast.Body>{toastMessage?.description || "title"}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </div>
  );
};

export default Output;
