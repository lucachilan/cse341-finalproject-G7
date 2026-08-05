require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongodb = require("./database/connect");

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.get("/", (req, res) => {
    res.send("Hello World - High School Course Enrollment API");
});
app.use('/auth', require('./routes'));

mongodb.initDb((err) => {

    if (err) {
        console.log("Database connection failed", err);
    } else {

        app.listen(port, () => {
            console.log(`Server running on port http://localhost:${port}`);
        });

    }

});