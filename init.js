const mongoose = require("mongoose");
const chats = require("./models/chat");


main().then(()=>{
    console.log("connection is successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let  allchats = ([{
        from:"neha",
        to:"priya",
        msg:"Hello how are you",
        created_at: new Date(),//date is a js function which genertes date randomly

    },
    {
        from:"Yogi",
        to:"Sahil",
        msg:"hello Bruh!",
        created_at: new Date(),
    },
    {
        from:"adam",
        to:"padam",
        msg:"how are you",
        created_at: new Date(),
    },

]);

chats.insertMany(allchats);