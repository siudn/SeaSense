import React, { useState, useEffect, useRef } from "react";

function Camera() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const handleStartCamera = async () => {
    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(userMediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleTakePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    // You can use the dataURL or send it to a server for further processing
    console.log("Captured image:", dataURL);
  };

  return (
    <div>
      <button onClick={handleStartCamera}>Start Camera</button>
      {stream && (
        <div>
          <video ref={videoRef} autoPlay playsInline muted />
          <button onClick={handleTakePhoto}>Take Photo</button>
        </div>
      )}
    </div>
  );
}

export default Camera;
