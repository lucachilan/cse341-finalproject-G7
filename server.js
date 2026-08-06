require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const mongodb = require("./database/connect");

const routes = require("./routes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const app = express();

const port = process.env.PORT || 8080;


// ======================
// Middleware
// ======================

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use(express.json());


// ======================
// Session
// ======================

app.set("trust proxy", 1);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production"
        }
    })
);


// ======================
// Passport
// ======================

app.use(passport.initialize());
app.use(passport.session());


// ======================
// Swagger
// ======================

// Dynamically set the host based on the environment so that it works correctly 
// regardless of where the swagger-output.json was generated.
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    swaggerDocument.host = "cse341-finalproject-g7.onrender.com";
    swaggerDocument.schemes = ["https"];
} else {
    swaggerDocument.host = `localhost:${port}`;
    swaggerDocument.schemes = ["http"];
}

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


// ======================
// Routes
// ======================

app.use("/", routes);


// ======================
// Home
// ======================

app.get("/", (req, res) => {
    res.send("High School Course Enrollment API");
});


// ======================
// MongoDB
// ======================

mongodb.initDb((err) => {

    if (err) {

        console.error("Database connection failed");
        console.error(err);

    } else {

        app.listen(port, () => {

            console.log(`Server running on port ${port}`);

        });

    }

});