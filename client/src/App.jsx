import { useState } from "react";
import Upload from "./upload";
import Camera from "./camera";
import Header from "./header";
import "./App.css";

function App() {
  return (
    <>
      <Header></Header>
      <div id="buttons">
        <Upload></Upload>
        <Camera></Camera>
      </div>
    </>
  );
}

export default App;
