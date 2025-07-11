const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema= new Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    }
});

module.exports=mongoose.model('user',UserSchema)
