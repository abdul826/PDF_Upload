const userModel = require('../Model/userModel.js');
const jwt = require('jsonwebtoken');

const userAuthentication = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;

        if(!token) return res.status(400).json({message:"Token not found"});

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(verifyToken){
            const rootUser = await userModel.findOne({_id:verifyToken._id});

            if(rootUser){
                req.rootuser = rootUser;
                req.token = token;
                req.userId = rootUser._id;

                next();
            }else{
                return res.status(400).json({message:"User not found"});
            }
        }else{
            return res.status(400).json({message:"Token not validated"});
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = userAuthentication;