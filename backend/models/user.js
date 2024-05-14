import mongoose from "mongoose"

const Userschema=mongoose.Schema({
    userName:{
        
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,

    },
    country:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    zipcode:{
        type:String,
        default:""
    },
    profilephoto:{
        type:String,
        default:""
    },
    backgroundphoto:{
        type:String,
        default:""
    }
})
export const User=mongoose.model('user',Userschema)