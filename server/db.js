const mongoose = require("mongoose")


async function ConnecToMongo(){
    await mongoose.connect("mongodb://127.0.0.1:27017/TaskMaster")
    console.log("connected ")
}


module.exports = ConnecToMongo ; 