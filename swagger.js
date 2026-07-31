const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'High School Course Enrollment API',
        description: 'Enroll students and teachers in different classes'
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
