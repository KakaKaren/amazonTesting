const express = require ("express");
const morgan = require("morgan");
const {MongoClient} = require('mongodb');
const bodyParser = require("body-parser");


const User = require('./models/user');

const app = express();

MongoClient.connect('mongodb://localhost:27017/root',{useNewUrlParser:true},(err,client)=>{

    if (err) 
    {
        console.log(err);
    }else
    {
        console.log("Connected to the database");
    }
});

debugger;
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/create-user',function(req,res,next){
    const user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err){
        if (err) next (err);

        res.json("Successfully created a new user in postman.");
    });
});



app.listen(3000,function(err){
    if (err) throw err;
    console.log("The amazon lesson is working  on localhost 3000.");
});