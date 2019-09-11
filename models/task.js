let mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskName:String,
    assignTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "developer"
    },
    dueDate:Date,
    taskStatus:{
        type:String,
        validate: {validator:function(value){
            if(value === "Inprogress" || value === "Complete")
                return true;
            else
                return false;
        },
        message: "task status: either InProgress or Complete"
        }
    },
    taskDescription: String   
});

let taskModel = mongoose.model('taskCol',taskSchema);
module.exports = taskModel;