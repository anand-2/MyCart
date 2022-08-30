const {
    Pool,
    Client
} = require("pg")
const client = new Client();
var express = require("express");
var bcrypt = require("bcrypt")

const [getAllProduct,getCart,insertIntoCart,updateCart,DeleteCart,checkUserExist,insertUser,getCredentials] = require("./product");
const jwt = require("jsonwebtoken");
var app = express.Router();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})

app.get("/product" ,verifyToken,async(req,res)=>{
    jwt.verify(req.token , process.env.SECRET,async(err,authData)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            await getAllProduct(pool)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                res.send(err)
            })
        }
    })   
}) 

app.get("/cart" ,verifyToken,async(req,res)=>{
 jwt.verify(req.token , process.env.SECRET , async(err,authData)=>{
    if(err){
        res.send(err)
    }
    else
    {
        await getCart(pool)
        .then(resp => {
            res.send(resp)
        })
        .catch(err => {
            //
            res.send(err)
        })
    }
 })   
}) 

app.post("/cart" ,verifyToken,async(req,res)=>{

    jwt.verify(req.token , process.env.SECRET , async (err,authData)=> {
        if(err)
        {
            res.send(err)
        }
        else {
            await insertIntoCart(pool,req.body)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                //
                res.send(err)
            })
        }
    })
    
}) 
  

app.put("/cart" ,verifyToken,async(req,res)=>{
    jwt.verify(req.token,process.env.SECRET, async(err,authData)=>{
        if(err){
            res.send(err)
        }
        else{
            await updateCart(pool,req.body)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                //
                res.send(err)
            })
        }
    })
    
}) 
  
app.delete("/cart" ,verifyToken,async(req,res)=>{
    jwt.verify(req.token, process.env.SECRET, async(err,authData)=>{
        if(err){
            res.send(err)
        }
        else{
            await DeleteCart(pool,req.query)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => {
                //
                res.send(err)
            })
        }
    })
}) 

app.post("/register",async(req,res)=>{
    let User = req.body;
    const hash = bcrypt.hashSync(User.pass, 10);
    User.pass = hash
    await checkUserExist(pool,User)
        .then(async resp=>{
            await insertUser(pool,User)
                .then(resp=>{
                    res.send(resp)
                })
                .catch(resp=>{
                    res.send(err)
                })
            
        })
        .catch(err=>{
            res.send(err)
        })
})

app.post("/login",async(req,res) =>{
    const enteredEmail = req.body.email;
    const enteredpass = req.body.pass;
    let result = {
        error: true,
        message: "Login failed. Please check username or password",
        token : undefined
    }
    await getCredentials(pool,enteredEmail)
        .then(resp=> {
           
            bcrypt.compare(enteredpass, resp.data.pass).then((success) => {
                console.log(enteredpass)
             if(success)
             {                
                jwt.sign({resp}, process.env.SECRET, (error,token) =>{
                    result.error = false;
                    result.message = "Login successful";
                    result.token = token
                    res.send(result)
                    return
                })
             }
             else{
                res.send(result)
                return
             }
           
            })
            .catch(err =>{
                res.send(err)
            })
        })   
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader!== "undefined")
    {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1];
        req.token = bearerToken ;
        next();
    }
    else{
        res.json("Forbidden Access")
    }
}


  

module.exports = app;