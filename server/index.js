const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const coffeeRoute = require("./Routes/CoffeeRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(
    cors({
        origin: [process.env.CLIENT_URL],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/coffee", coffeeRoute);