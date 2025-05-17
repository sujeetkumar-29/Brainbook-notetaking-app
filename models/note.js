const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});
module.exports=mongoose.model('Note',noteSchema);

