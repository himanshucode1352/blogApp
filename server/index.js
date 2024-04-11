const express=require("express");
const mongoose= require("mongoose");
const app=express();
const Dotenv = require("dotenv")
 const blogRoutes= require('./application/routes/blog.routes')
 var logger = require('morgan');
var cors=require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/blog',blogRoutes);
app.use(logger('dev'));
Dotenv.config()
const connectionString = "mongodb+srv://himtri6657:ambala123@cluster0.7kqxo.mongodb.net/ecommerce"


mongoose.connect(connectionString).then(()=>{
    console.log("Database Connected Succssfully")
}).catch((err)=>{
    console.log(err)
});
const port = process.env.port||8001

app.get('/', (req, res) => {
    res.send('Hello, welcome to my blogging platform!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});