import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CODE_SNIPPETS } from "../utils/constants";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Col>
        <Col md={4}>
          <Output editorRef={editorRef} language={language} />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
