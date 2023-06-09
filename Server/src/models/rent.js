const mongoose = require('mongoose');

const rentSchema = mongoose.Schema({
    plateRent:{
        type: String,
        require:true  
    },
    initialDate:{
        type: String,
        require:true  
    },
    finalDate:{
        type: String,
        require:true  
    },
    rentNumber:{
        type: String,
        require:true  
    },
    statusRent:{
        type: Boolean,
        require:true  
    },
    returnDate:{
        type: String,
    }
    
});

module.exports = mongoose.model('Rent', rentSchema);	