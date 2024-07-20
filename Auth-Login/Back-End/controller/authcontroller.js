const User = require('../models/usermodels')

const bcrypt = require('bcryptjs')

const signup =async (req, res,next) => {
     const{username, email,password} = req.body;
     const hashedpassword= bcrypt.hashSync(password,10) 
    const newUser = new User({username, email, password:hashedpassword })
    try{
      await newUser.save()
    
      res.status(201).json({message:"User create Successfully"})
    
    }
    catch (error){
      next(error)
    }

   
}
    module.exports = { signup };
    