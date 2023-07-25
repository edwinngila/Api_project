const Sequelize=require('sequelize');
const httpErrors=require('http-errors');
const bcrypt=require('bcrypt');
const User=require('../models/User.model');
const jwt = require('jsonwebtoken')
module.exports={
    registerUsers:async(req,res,next)=>{        
        try{
           const{userName,password,roll}=req.body;
           const exists= await User.findOne({ where: {userName:userName}});
           if(exists) throw httpErrors.Conflict(`${userName} this user name is in use `);
           const hashed = await bcrypt.hash(password,10)
           const user = await User.create({
                userName:userName,
                password:hashed,
                roll:roll
           });
           res.send(user)
        }
        catch(err){
            console.error(`this is the error massage`,err)
            res.send({
                message:err
            })
        }
    },
    loginUser:async(req,res,next)=>{
        try{
            const{userName,password}=req.body;
            const exists= await User.findOne({where:{userName:userName}});
            if(!exists) throw httpErrors.Conflict(`${userName} this user dose not exist in the database`);

            const passwordValidation = await bcrypt.compare(password,exists.password);
            if(!passwordValidation) throw httpErrors.Conflict(`password is not valid for the user`);

            const accessToken = jwt.sign({userId:exists.id,userName:exists.userName},process.env.JWT_SECRET,{expiresIn:'1h'});
            res.send({
                user:userName,
                accessToken:accessToken
            })

        }
        catch(err){
            console.error(`the message is `,err)
        }
    }
}