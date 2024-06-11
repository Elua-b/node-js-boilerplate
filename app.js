const express = require("express");
const mongoose = require('mongoose');
const foodRoute = require('./routes/admin-routes');
const db=require('./models/index')
const cors=require('cors')
const router =require ("./routes");
const dotenv = require('dotenv');
const options = require('./utils/cors.util')
// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerFile = require("./swagger/swagger.json");
const app = express();
app.use(express.json()) 
app.use(cors(options))
dotenv.config();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
    next();
 }) 
// app.use(app.router)
 app.use("/", router);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
})
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log("Failed to connect to the database!", err);
        process.exit();
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
