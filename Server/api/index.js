const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const auth = require('../middlewares/auth');
dotenv.config();

const authRoute = require("../Routes/auth");
const breweryRoute = require("../Routes/breweries");
const reviewRoute = require("../Routes/reviews");

const cors = require('cors');
const app = express();


//Middlewares
app.use(cors({
    origin: ["http://mo-engage-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json());

const port = 3000;

app.get("/", (req, res) => res.send("Express on Vercel"));
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.log("error occurred while connecting mongodb!", error)
    }
}

// Routes
app.use('/api/auth', authRoute);
app.use('/api/breweries', breweryRoute);
app.use('/api/reviews', auth, reviewRoute);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})


module.exports = app;
