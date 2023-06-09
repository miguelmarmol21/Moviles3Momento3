const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    plateNumber:{
        type: String,
        require:true     
    },
    brand:{
        type: String,
        require:true     
    },
    statusCar:{
        type: Boolean,
        require:true     
    },
    dailyvalue:{
        type: String,
        require:true     
    }
});

module.exports = mongoose.model('Car', carSchema);	
