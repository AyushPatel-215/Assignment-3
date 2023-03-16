const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    message:{
        type:String,
        require:true,
        trim:true
    },
    userId:{
        type:String
    },
    requestId:{
        type:Number
    },
    category:{
        type:String,
        enum:{
            values:["Direct","Retired","Failed"]
        }
    },
    createdTime:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('messege',messageSchema)