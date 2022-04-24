require("./db/dbConfig");
require("dotenv").config;
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const routes = require("./Routes/auth");
const errorsHandler = require("./Middleware/errorHandler");
const cors = require("cors")


app.use(express.json());

app.use(cors({
    origin: ["https://subharti.ml", "http://localhost:3000"]
}))


// Main Routes.
app.use("/api/v0/auth", routes);






// Error Handlers.
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Server is running in pror ${port}`)
});









