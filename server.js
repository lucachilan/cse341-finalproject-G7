const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World - High School Course Enrollment API");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});