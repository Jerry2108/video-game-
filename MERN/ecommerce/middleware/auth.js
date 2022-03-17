import dotenv from 'dotenv';
import jsonwebtoken from "jsonwebtoken";

dotenv.config(); 

 const auth = async(req,res,next)=>{
     try{
          //Get a token from a header property of req. 
    const token = req.header('authorization');
    if(!token){
        return res.status(401).send({msg: 'No token, authentication denied'});
    }
    //status 401 is for authentication
         //verify token. If the token is valid, we will get a decoded payload which is {id: user._id}
        const decodedPayload = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        //add user to payload
        req.use = decodedPayload; 
        next();
    }
    catch(errors){
        //console.log(errors);
        return res.status(400).send({msg: 'Token is not valid'}); 
    }

}
export default auth;
