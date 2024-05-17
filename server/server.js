const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

// app.use(express.static("./dist"));
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
