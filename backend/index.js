const express = require("express");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
require('express-async-errors');
const mainRoute = require('./src/routes/main');
const notFound = require('./src/middlewares/notFound');
const errorHandler = require('./src/middlewares/errorHandler');
const cors = require('cors');

//middlewares
app.use(cors({origin: "https://form-bot-mern.vercel.app", credentials: true}));
app.use(express.json());


app.get("/", (req, res) => {
    return res.send("<h1>Quizze App Backend Working </h1>");
})

app.use("/v1", mainRoute);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))
    } catch (error) {
        throw new Error('Internal Server Error');
    }
}

start();
