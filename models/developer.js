let mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    name: {
        firstName:{
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        validate: {validator:function(value){
            if(value === "Beginner" || value === "Expert")
                return true;
            else
                return false;
        },
        message: "Level: either Beginner or Expert"
        },
        required:true
    },
    address: {
        State: String,
        Suburb: String,
        Street: String,
        Unit: Number
    }
})

let developerModel = mongoose.model('developerSol',developerSchema);
module.exports = developerModel;