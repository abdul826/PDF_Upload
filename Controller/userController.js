const userModel = require('../Model/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req,res)=>{
    try {
        const {username,email,password,cPassword} = req.body;
        if(!username || !email || !password || !cPassword){
            return res.status(400).json({message:"All fields are mandatory"});
        }else if(password !== cPassword){
            return res.status(400).json({message:"Password and confirm Password does not matched"});
        }

        const existingUser = await userModel.findOne({email:email});

        if(existingUser) return res.status(400).json({message:"Email is already exist.Please choose another email"});

        const newUser = new userModel({
            username,email,password
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

exports.login = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password) return res.status(400).json({message:"All fields are required"});

    try {
        const validUser = await userModel.findOne({email:email});
        if(!validUser) return res.status(400).json({message:"Email is not correct."});

        const isMatch = await bcrypt.compare(password,validUser.password)
        if(!isMatch) return res.status(400).json({message:"Password is not matched"});

        const token = jwt.sign({
            _id:validUser._id
        }, process.env.JWT_SECRET_KEY, {expiresIn:'1h'});

        const result = {
            validUser,
            token
        }
        if(result){
            res.status(200).json({message:result});
        }
    } catch (error) {
        return res.status(400).json({message:"Error while authentication",error:error});
    }
}