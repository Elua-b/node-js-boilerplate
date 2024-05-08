const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: ["User", "Auth"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger/swagger.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);