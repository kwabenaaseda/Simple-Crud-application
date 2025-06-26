const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    timestamp:{
        type: String,
        default: ()=>{
            const time = new Date();
            return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`;
        }
    }
    
},{timestamps: true});

module.exports = mongoose.model("Activity", Activity);