import mongoose from "mongoose";

const createdschema=mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    description :{
    type:String,
    requied:true
    },
    image: {
        type:String,
        required:true
    },
    created_date:{
        type:Date,
    },
    
    update_date:{
        type:Date,
    },
    liked:{
        type:Boolean,
        default:false
    },
    user:{
        type:String
    },
    comment:[{
       text:{
        type:String
       },
       createdAt:{
        type:Date,
        default : new Date()
       }
    }],
   

});
export const created=mongoose.model('created',createdschema)