const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'High School Course Enrollment API',
        description: 'Enroll students and teachers in different classes'
    },
    host: process.env.NODE_ENV === 'production' || process.env.RENDER 
        ? "cse341-finalproject-g7.onrender.com" 
        : "localhost:8080",
    schemes: process.env.NODE_ENV === 'production' || process.env.RENDER 
        ? ["https"] 
        : ["http"]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
