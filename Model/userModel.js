const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});

// Bcrypt the password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;