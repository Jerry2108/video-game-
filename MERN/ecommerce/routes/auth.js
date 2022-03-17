import { Router } from 'express';
import {logIn, signUp, getUser} from '../controllers/authControllers.js';
import auth from '../middleware/auth.js';

const authRouter =  Router();
  
authRouter.post("/logIn", logIn);
authRouter.post("/signUp", signUp);
authRouter.get("/user", auth, getUser);
export default authRouter;