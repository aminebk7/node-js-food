const express=require('express');
const app= express();
app.use(express.json());
const cors = require('cors');
const mongoose=require('./config/connecte.js');

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization']
  }));
  
const productRoute=require("./route/product.js");
app.use('/product',productRoute);


app.use('/getimage',express.static('./upload'));

app.listen(3000,()=>{

    console.log('Server Work');
});