const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const PORT =process.env.port || 5000 ;
app.listen( PORT,()=>{
     console.log(`app is running on port ${process.env.port}`);
})

const dbConnect = require("./database/database");
dbConnect(); 
const info = require("./model/infoMode");
const loadData =async ()=>{
       const data = await fetch(`https://s3.amazonaws.com/roxiler.com/product_transaction.json`);
      const response =await data.json() ;
       console.log(response);
       info.insertMany(response) ;
}

app.use(cors());

const sale = require('./Routes/sale')
app.use('/api/v1', sale)
