import React, { useState } from "react";

function Upload() {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(true);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
    }
  };

  return (
    <div>
      {showInput ? (
        <input type="file" onChange={handleFileInputChange} />
      ) : (
        <button onClick={handleClick}>Choose File</button>
      )}
    </div>
  );
}

export default Upload;
