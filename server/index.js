require('dotenv').config();
const express = require("express") 
const app = express()
const  port=  process.env.PORT || 8000  
const cors = require("cors")
const ConnecToMongo = require("./db.js")



app.use(cors());
app.use(express.json());

ConnecToMongo()


app.use("/api/task"  , require("./routes/task.js"))
app.use("/api/auth"  , require("./routes/auth.js"))


app.get("/"  , (req,res)=>{
    res.send("home")
})


app.listen(port , ()=>{
    console.log(`listening on port ${port}`)
})