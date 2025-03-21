import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API documentation for the project",
  },
  tags: [
    {
      name: "Users",
      description: "Users management",
    },
    {
      name: "Events",
      description: "Events management",
    },
    {
      name: "Types",
      description: "Types management",
    },
    {
      name: "Participations",
      description: "Participations management",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: express.Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
