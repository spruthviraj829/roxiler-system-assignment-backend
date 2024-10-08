
const mongoose = require("mongoose")
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL ,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log('connection with database sucessful'))
    .catch((error)=>{
        console.log('r=error in connection of databse')
        console.log(error)
        process.exit(1)
    })
}

module.exports = dbConnect;