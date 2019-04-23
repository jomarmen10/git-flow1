const express = require('express');
const app = express();
require('dotenv').config()
const houseController = require('./controller')


app.use('/', houseController)


app.listen(3000,()=>{
  console.log('running on port:', 3000)
});
