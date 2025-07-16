
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Muscu API',
      version: '1.0.0',
      description: 'Documentation de l’API Muscu',
    },
  },
  apis: [
    './routes/*.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;