require("./db/dbConfig");
require("dotenv").config;
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require("./Routes/auth");
const adminRoute = require("./Routes/admin");
const homeRoute = require("./Routes/home");
const errorsHandler = require("./Middleware/errorHandler");
const cors = require("cors")

app.use(express.json());

app.use(cors({
    origin: ["https://subharti.ml", "http://localhost:3000", "https://hoppscotch.io"]
}))


// Main Routes.
app.use("/api/v0/auth", authRoutes);
app.use("/api/v0/admin", adminRoute);
// app.use("/api/v0/home", homeRoute);




// Error Handlers.
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Server is running in pror ${port}`)
});









