require('dotenv').config();
const express = require('express');
const PORT = 8080;
const app = express();

// Connect to DB
require('./db/conn.js');

// parses incoming requests with JSON payloads
app.use(express.json());

// add Route
const userRoute = require('./Route/userRoute.js');
const pdfRoute = require('./Route/pdfRoute.js');

app.use('/api', userRoute);
app.use('/api/pdf', pdfRoute);


app.listen(PORT, ()=>{
    console.log("Listen on port "+ PORT);
});
