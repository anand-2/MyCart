const {
    Pool,
    Client
} = require("pg")
const client = new Client();
var express = require("express");

const [getAllProduct,getCart,insertIntoCart,updateCart,DeleteCart] = require("./product");
var app = express.Router();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})

app.get("/product" ,async(req,res)=>{

    await getAllProduct(pool)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                res.send(err)
            })
}) 

app.get("/cart" ,async(req,res)=>{

    await getCart(pool)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                //
                res.send(err)
            })
}) 

app.post("/cart" ,async(req,res)=>{

    await insertIntoCart(pool,req.body)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                //
                res.send(err)
            })
}) 
  

app.put("/cart" ,async(req,res)=>{

    await updateCart(pool,req.body)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                //
                res.send(err)
            })
}) 
  
app.delete("/cart" ,async(req,res)=>{

    await DeleteCart(pool,req.query)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                //
                res.send(err)
            })
}) 
  

module.exports = app;