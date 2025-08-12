const mongoose = require('mongoose');

mongoose.connect(process.env.URI).then(()=>{
    console.log(`Succesfully connect with database`);
}).catch((err)=>{
    console.log(`Error while connecting with DB ${err}`);
});