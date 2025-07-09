const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js")
const methodOverride = require("method-override");

app.set("views", path.join(__dirname,"views" ));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));//to parse the data in the post method


main().then(()=>{
    console.log("connection is successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


//index rout
app.get("/chats",async(req, res) =>{
    let chats = await chat.find();//await coz chat is async function
    //console.log(chats);
    res.render("index.ejs",{chats});

});

//new rout
app.get("/chats/new", (req,res) =>{
    res.render("new.ejs");
});

//create rout
app.post("/chats",(req, res) =>{
    let {from, to, msg} = req.body;
    let newChat = new chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat
    .save()
    .then(() =>{console.log("chat was saved");
        res.redirect("/chats");
    })
    .catch((err) =>{
        console.log(err);
    });
    
});

//Edit rout
app.get("/chats/:id/edit", async(req, res) =>{
    let { id } = req.params;
    let chatitem = await chat.findById(id);
    res.render("edit.ejs", { chat : chatitem });
});

//Update rout
app.put("/chats/:id",async (req, res) =>{
     let { id } = req.params;
     let {msg: newMsg } = req.body;
     let updatedchat = await chat.findByIdAndUpdate(
        id,
        {msg:newMsg}, 
        {runValidators:true, new:true}
     );
    res.redirect("/chats");
    console.log(updatedchat);
    
});

//Destroy rout
app.delete("/chats/:id",async(req,res) =>{
    let { id } = req.params;
    let deletedchat = await chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
    
    
});

// let chat1 = new chat ({
//     from:"neha",
//     to:"priya",
//     msg:"Hello how are you",
//     created_at: new Date()//date is a js function which genertes date randomly

// });

// chat1.save().then((res) =>{
//     console.log(res);
// });

app.get("/",(req, res) =>{
    res.send("root is working");
});


app.listen(8080,() =>{
    console.log("port 8080");
});