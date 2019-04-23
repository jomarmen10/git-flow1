const express = require('express');
const app = express();
require('dotenv').config()
const controller = require('./controller')


app.use('/', controller)


app.listen(3000,()=>{
  console.log('running on port:', 3000)
});
