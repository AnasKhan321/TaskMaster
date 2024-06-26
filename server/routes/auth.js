const express = require("express")
const router = express.Router()
const User = require('../Models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    let success = false;
    let user = await User.findOne({ email: email })
    if (user) {
        res.json({ success: success, error: "Your email is already Register Login or Register with other email " });
    }
    else if (password.length < 8) {
        res.json({ success: success, error: "Password Must Contain 8 letters " });
    }

    else {
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);
        const newUser = await User.create({
            username: username,
            email: email,
            password: hash
        })
        const data = {
            user: {
                id: newUser.id,
                email: newUser.email
            }
        }
        success = true;
        var token = jwt.sign(data, process.env.SECRET_TOKEN);

        res.json({ success: success, token: token , username : username })
    }

})




router.post('/login' , async(req,res)=>{
    try {
        const {email ,password} = req.body
        let user = await User.findOne({ email: email })
        if (user) {
            const passwordCompare = await bcrypt.compare(password, user.password)
            if(passwordCompare){
                const data = {
                    user  : {
                        id: user.id,
                        email: user.email
                    }
                }
                success = true;
                var token = jwt.sign(data, process.env.SECRET_TOKEN);
                res.json({ success:true, token: token , username : user.username})
            }else{
              res.json({success : false , error : "Invalid Password"})
            }
          }
  
        else{
            res.status(500).json({success : false , error : "Invalid Email or Password "})
        }
    } catch (error) {
        res.status(500).json({error : error , success : false })
    }
  })
  



module.exports = router 