const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const uri = MONGO_URI

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Database connection failed");
        console.error(error);
    });