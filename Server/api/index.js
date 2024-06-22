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

app.get("/", (req, res) => res.send("Express on Vercel"));

//Middlewares
// app.use(cors({
//     origin: ["https://mo-engage-client.vercel.app"],
//     methods: ["POST", "GET"],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(cors({
    origin: 'https://your-vercel-app-url.vercel.app', // Replace with your Vercel app URL
    methods: ['GET', 'POST'], // Adjust the methods as needed
    credentials: true // Include cookies in CORS requests
}));
app.use(express.json());

const port = 3000;

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


