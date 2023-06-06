const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    names:{
        type: String,
        require:true     
    },
    email:{
        type: String,
        require:true  
    },
    userName:{
        type: String,
        require:true  
    },
    password:{
        type: String,
        require:true  
    },
    role:{
        type: String,
        require:true  
    },
    reservword:{
        type: String, 
    }
});

module.exports = mongoose.model('User', userSchema);	
