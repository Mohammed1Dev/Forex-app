const express= require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app= express();
const cors = require('cors');

const expressValidator = require('express-validator')
//router

let user= require('./route/user');

app.use(express.json())
app.use(expressValidator())
app.use(cors())
require("dotenv").config()
// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTION");
//     next();
//     });

// connection to database
mongoose.connect("mongodb+srv://Amine:qKNqXlrvekwRv3t2@freecluster.jomdc.mongodb.net/Forex-db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log('connected to database'))
.catch(() => console.log('database is not connected'))

app.use("/api/user",user);

app.get('/', (req, res) => {
  res.send('OK')
})
  


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    // loggers.info(`Server listen this Port ${PORT}`);
    // loggers.error("sommting wrong");
    console.info(`Server listen this Port ${PORT}`);
});