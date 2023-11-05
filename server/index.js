const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3001; // Use the port of your choice

const storage = multer.diskStorage({
  destination: "./uploads/", // Set your upload directory
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

app.use(express.static("uploads")); // Serve uploaded files

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
