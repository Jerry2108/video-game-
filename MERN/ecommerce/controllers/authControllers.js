import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function authenticate(req,res){
    try{
        const saltRounds = 10;
        //user's credentials
        const {name, email, password} = req.body;
        
        //make sure all essential details are given. 
        if (!name || !email || !password){
            res.status(400).json({msg: 'Please enter all fields'});
        }
    
        //make sure a user has not existed
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({msg: 'User already exists'}); 
        }

        //let a new user sign up
        const newUser = new User({name, email, password});
    
        //create salt and hash
        let hash = await bcrypt.hash(password, saltRounds);

        //store hash in your user db
        newUser.password = hash;

        //save user 
        return await newUser.save();
    }
    catch(errors){
        console.log(errors);
    }   
}

//sign up 
export const signUp = (req,res) =>{
    authenticate(req, res).then(savedUser => {
        jsonwebtoken.sign({id:savedUser._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (errors, token) =>{
            if (errors){
                throw errors;
            }
            return res.json({token, user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }});
        })

    });
}
        
//matchPassword
const matchPassword = async (password, user)=>{
    try{
    return await bcrypt.compare(password, user.password);
    }
    catch(errors){
        throw errors;
    }
}
export const logIn = (req,res)=>{
    const {password,email} = req.body;
    
    if (!password || !email){
        return res.status(400).json({msg: "Please enter all fields"});
    }

    User.findOne({email}).then(user => {
        matchPassword(password, user).then(isMatch => {
        if (!isMatch ){
            return res.status(400).json({msg: "Incorrect password"})
        }
        jsonwebtoken.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (errors, token) =>{
            if (errors){
                throw errors;
            }
            return res.json({token, user: {
                id: user._id,
                name: user.name,
                email: user.email
            }})
        })
    })
})};

//get user 
export const getUser = (req,res) => {
    console.log('getuser');
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))

}