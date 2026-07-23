require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mongodb = require("./database/connect");

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World - High School Course Enrollment API");
});


mongodb.initDb((err) => {

    if (err) {
        console.log("Database connection failed", err);
    } else {

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    }

});