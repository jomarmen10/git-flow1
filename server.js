const express = require('express');
const app = express();
require('dotenv').config()

// hello


app.listen(3000,()=>{
  console.log('running on port:', 3000)
});
