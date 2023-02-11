const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const connectDB = require('./database/connection')
const app = express();
const port = process.env.PORT || 8080;
const createuser = require('./routes/CreateUser')
const loginuser = require('./routes/LoginUser');
const DisplayData = require('./routes/DisplayData');
const cors = require('cors');

// if not using cors package
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
//     res.header(
//         "Access-Control-Allow-Origin",
//         "Origin,X-Requested-With,Content-Type,Accept"
//     );
//     next();
// })

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api', createuser);
app.use('/api', loginuser);
app.use('/api', DisplayData);


const startserver = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`connection established ${port}`))
    } catch (err) {
        console.log(err);
    }
}

startserver();

