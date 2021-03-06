const path = require("path");

const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const { readdirSync } = require("fs");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolver/index");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const express = require("express");

const app = express();
// // //Route files
const category = require("./routes/category");
const subs = require("./routes/subCategory");
const product = require("./routes/product");

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// //instead of importing every route we will use this idea
// readdirSync("./routes").map((r) =>
//   app.use("/api/v1", require("./routes/" + r))
// );

// // Set static folder
// app.use(express.static(path.join(__dirname, "public")));

// // // Mount routers
app.use("/api/v1/cat", category);
app.use("/api/v1/sub", subs);
app.use("/api/v1/product", product);
//swager documentation
//swager options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "soum project",
      version: "1.0.0",
      description:
        "soum interview backend server build with node js and mongo db using rest api and qrapql ",
      contact: {
        name: "Ahmed Ibrahim",
        url: "https://my-portofolio-swart.vercel.app",
        email: "ahmedibrahimhassan654@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development server",
      },
      {
        url: "production url server",
        description: "Production server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//install grapql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.use(errorHandler);

// app.use((error, req, res, next) => {
//   res.status(500).json({ message: error.message });
// });
module.exports = app;
