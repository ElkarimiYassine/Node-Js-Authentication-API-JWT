const router = require('express').Router();
const User = require('../model/User');
const { SignupValidation, LoginValidation} = require('../validation');
const bycript = require('bcryptjs');
const JWT = require('jsonwebtoken');

//Signup

router.post('/register', async (req,res,next)=>{
    //validation
    const { error } = SignupValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const CheckEmail = await User.findOne({ email: req.body.email });
    if(CheckEmail){
        res.status(400).send('Email already exists')
    }

    // hashing password
    const salt = await bycript.genSalt(10);
    const hashedPassword = await bycript.hash(req.body.password, salt);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
    });
    
    try{
        const saveUSer = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }   
})

// Login

router.post('/login', async (req,res,next) => {
    const {error} = LoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if(!user){
        res.status(400).send("Email dosen't exists");
    }

    const pwd = await bycript.compare(req.body.password, user.password );
    if(!pwd){
        res.status(400).send("password not valid");
    }

    //Token
    const Token = JWT.sign({_id: user._id}, process.env.JWT_SECRET);
    res.header('auth-token', Token).send(Token);
    console.log({_id: user._id, name: user.name, email: user.email})
})

module.exports = router;

