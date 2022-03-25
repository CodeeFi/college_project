require("./db/dbConfig");
require("dotenv").config;
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./Routes/auth");
const errorsHandler = require("./Middleware/errorHandler");



app.use(express.json());



// Main Routes.
app.use("/api/v0/auth", routes);






// Error Handlers.
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Server is running in pror ${port}`)
});









