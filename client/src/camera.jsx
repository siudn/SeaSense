import { useState, useEffect, useRef } from "react";

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
      canvas.toBlob(blob => {
        // Here you get the image as a Blob
        console.log("Captured image blob:", blob);
        uploadImage(blob);
      }, 'image/png');
  };

  const uploadImage = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'photo.png');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <div>
      <button onClick={handleStartCamera}>Use Camera</button>
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
