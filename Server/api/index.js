const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const auth = require('../middlewares/auth');
const cors = require('cors');
const authRoute = require("../Routes/auth");
const breweryRoute = require("../Routes/breweries");
const reviewRoute = require("../Routes/reviews");

dotenv.config();
// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//Middlewares
app.use(cors({
    origin: "https://mo-engage-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}));


const app = express();

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
