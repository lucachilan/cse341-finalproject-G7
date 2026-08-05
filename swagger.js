const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'High School Course Enrollment API',
        description: 'Enroll students and teachers in different classes'
    },
    //Render
    host: "cse341-finalproject-g7.onrender.com/",
    schemes: ["https"]
    //Local
    //host: "localhost:8080",
    //schemes: ["http"],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
