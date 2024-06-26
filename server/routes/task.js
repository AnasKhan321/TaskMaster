const express = require("express")
const router = express.Router()
const Task = require("../Models/Task.js")
const MiddleWare = require("../MiddleWare/JwttoUser.js")

router.get('/'  , MiddleWare , async(req,res)=>{
    try {
       
        
        const allTasks = await Task.find({useremail : req.user.email})

        res.json({success : true , tasks  : allTasks})
        
    } catch (error) {
        res.json({success  :false , error : error})
        
    }
})

router.post('/create'  , MiddleWare , async(req,res)=>{

    try {
        console.log(req.user)
        const {title , description  , status}  = req.body 
        const newTask = await Task.create({
            useremail : req.user.email , 
            title  : title , 
            description: description , 
            status :status 
        })

        res.json({success : true })


    
    } catch (error) {
        console.log(error)
        res.json({success : false , error : error})
        
    }
})


router.delete('/:id'  , MiddleWare , async(req,res)=>{
    try {
            const id = req.params.id 
            await Task.findByIdAndDelete(id)
            res.json({success : true})

    } catch (error) {
        res.json({success : false , error : error})
    }
})

router.get("/query/:query"  , MiddleWare , async(req,res)=>{
    try{

        const tasks = await Task.find({useremail : req.user.email , status : req.params.query})

        res.json({success : true , tasks : tasks})


    }catch(error){
        res.json({success : false , error : error })
    }
})


router.put("/"  , MiddleWare , async(req,res)=>{
    try {


        const id = req.body._id 

        await Task.findByIdAndUpdate(id , req.body)

        res.json({success : true })
    } catch (error) {
        res.json({success : false ,error : error })
        
    }
})



router.get('/id/:id'  , MiddleWare , async(req,res)=>{
    try{

        const id  = req.params.id 

        const data = await Task.findById(id)

        res.json({success  : true , data : data})

    }catch(error){
        res.json({success : false ,error : error })
    }
})



module.exports = router 