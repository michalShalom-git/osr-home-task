const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const newsRouter = require('./routes/news');

require('dotenv').config();

const app = express();
app.timeout = 3600000; // 1 hour
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);
const url = process.env.url2;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
    console.log('MongoDB Connection Succeeded.');
    } else {
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
    }
});
    
const connection = mongoose.connection;

connection.on('connected', () => {
    console.log("Mongoose database connection established successfully");
});

connection.on('error', (error) => {
    console.error("Error occurred while establishing MongoDB connection: ", error);
});       

app.use('/news', newsRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});