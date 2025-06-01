// src/config/swagger.ts
import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "SIGEFLOW API",
    version: "1.0.0",
    description: "Documentação da API de contratos e fornecedores",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor local",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
