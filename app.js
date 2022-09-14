var express=require("express");
var mongoose=require("mongoose");
var app= express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema={
    name: String,
};

const Item=mongoose.model("Item",itemSchema);
const item1=new Item({name:"Welcome to Todolist"});
const item2=new Item({name:"This is a tool to track progress"});
const item3=new Item({name:"Use it wisely"});

const d=[item1, item2, item3];

app.get("/", function(req, res){
    Item.find({}, function(err, f){
        if(f.length===0){
            Item.insertMany(d, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully saved items to database");
                }
            });
            res.redirect("/");
        }else{
            res.render("list", {newListItem: f});
        } 
    });
});

app.post("/", function(req, res){
    i=req.body.n;
    const item = new Item({
        name: i,
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", function(req, res){
    Item.findByIdAndRemove(req.body.checkbox, function(err){
        if(!err){
            console.log("Successfully deleted");
            res.redirect("/");
        }
    });
});

app.listen(3000,function(){
    console.log("listening on port 3000.")
});

// setup nodemon so I don't have to re-start the server every time to view changes.
// setup ejs or any other "template engine" so our node.js code can understand css and http files.
// setup and use express as our web application framework for node.js
// The first two lines of code are used to setup express on our website.
// app.get("/", function(req, res){}) is our means of sending requests to and 
// recieving responses from our server.
// app.listen(3000, function(){}) tells our website to listen to the port 3000 on the localhost.
// install the body-parser to parse incoming body code
// we install mongoDB to have our data stored and accesable when we re-start 
// the server. mongoose is an object data modeling library for mongoDB
// I used mongo shell to operate server. Regular methods did not work for some reason.
// The final functionality of the app allows to add objects to the list, store objects in a database and delete objects when complete.
// Need to better understand Schemas
// Why does everyone still use var? Are the guides old? Should I use let instead?
// Callback functions are very important!!!
// Need to better understand how all the packages communicate with eachother eg. express has its own <% %> syntax inside js code.
// MongoDB is very quick and easy to understand. I like it.
// GET BETTER AT app. COMMANDS!