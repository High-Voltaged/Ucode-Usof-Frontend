import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({ height = 300, ...props }) {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  return (
    <ReactQuill
      style={{ width: "100%", height }}
      modules={modules}
      theme="snow"
      {...props}
    />
  );
}

export default Editor;
