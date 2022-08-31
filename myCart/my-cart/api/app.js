
const express = require('express')
require("dotenv").config()

var app = module.exports = express();
const port = 5000



var product_route = require('./routes');
var cors = require('cors')

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

app.use(function(req,res,next){
  res.append("Access-Control-Allow-Origin","*")
  next()
})
app.use(cors());
app.use("/api", product_route);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})


