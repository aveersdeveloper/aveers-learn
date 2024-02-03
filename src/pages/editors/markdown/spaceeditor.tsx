import { useState } from "react";
import "./spaceeditor.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight"; // This is a dark theme, you can choose another if you prefer

function SpaceEditor() {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const generatePreview = () => {
    return `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
  };

  const downloadHTML = () => {
    const blob = new Blob([generatePreview()], { type: "text/html" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "created.html"; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-editor-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>HTML Markdown Editor</h1>
        <button className="download-btn" onClick={downloadHTML}>
          Download HTML
        </button>
      </div>
      <div className="editor-row">
        <AceEditor
          mode="html"
          theme="twilight"
          placeholder="Enter HTML here"
          value={htmlCode}
          onChange={setHtmlCode}
          name="HTML_EDITOR"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ width: "33%", height: "450px" }}
        />
        <AceEditor
          mode="css"
          theme="twilight"
          placeholder="Enter CSS here"
          value={cssCode}
          onChange={setCssCode}
          name="CSS_EDITOR"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ width: "33%", height: "450px" }}
        />
        <AceEditor
          mode="javascript"
          theme="twilight"
          placeholder="Enter Javascript here"
          value={jsCode}
          onChange={setJsCode}
          name="JS_EDITOR"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ width: "33%", height: "450px" }}
        />
      </div>
      <iframe
        srcDoc={generatePreview()}
        title="preview"
        className="preview-pane"
      ></iframe>
    </div>
  );
}

export default SpaceEditor;
