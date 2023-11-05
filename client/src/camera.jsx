import React, { useState, useRef } from "react";

function Camera() {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleTakePhoto = () => {
    if (mediaStream) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob, "photo.png"); // You can specify the filename here

          fetch("http://localhost:5174/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              console.log("Image uploaded successfully");
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            });
        }
      });
    }
  };

  return (
    <div>
      <button onClick={handleStartCamera}>Start Camera</button>
      <video ref={videoRef} autoPlay playsInline muted />
      <button onClick={handleTakePhoto}>Take Photo</button>
    </div>
  );
}

export default Camera;
