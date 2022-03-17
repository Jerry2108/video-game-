import mongoose from 'mongoose';
import validator from 'validator';
import isEmail from 'validator/lib/isEmail.js';

const schema = mongoose.Schema; 

//create a user schema
const UserSchema = new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true, 'Pleaase enter a valid password'],
        minlength:  [6, 'Minimum password length must be 6 characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

//create a user model and save it
const User = mongoose.model('User', UserSchema); 
export default User;
