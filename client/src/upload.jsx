import React, { useState } from "react";
import FormData from "form-data";

function Upload() {
  const [showInput, setShowInput] = useState(false);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    setShowInput(true);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(e.target.files[0]);
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5174/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Upload response:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      {showInput ? (
        <>
          <input type="file" onChange={handleFileInputChange} />
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <button onClick={handleClick}>Choose File</button>
      )}
    </div>
  );
}

export default Upload;
