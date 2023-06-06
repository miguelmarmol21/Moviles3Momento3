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
    confPassword:{
        type: String,
        require:true  
    },
    removeEventListener:{
        type: String,
        require:true  
    }
});

module.exports = mongoose.model('User', userSchema);	
