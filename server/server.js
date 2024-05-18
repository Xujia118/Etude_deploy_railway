const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.static("../client/test-railway/dist"));
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

app.get("/test", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
