import crypto from "crypto"
import User from "../models/User";

export class UserService{
    static register = async (req)=>{

        const user = req.body;

        const existedById = await User.findOneByUserId(user.user_id);

        if(existedById!=null){
            let err = new Error();
            err.message = "This User_ID is already in use";
            err.status = 400;
            throw err;
        }
        
        const existedByEmail = await User.findOneByUserEmail(user.user_email);

        if(existedByEmail!=null){
            let err = new Error();
            err.message = "This User_Email is already in use";
            err.status = 400;
            throw err;
        }

        const encrypted = crypto
           .createHmac("sha1", process.env.PASSWORD_KEY)
           .update(user.user_pw)
           .digest("base64");
        
        user.user_pw = encrypted;

        try{
            await User.create(user);
        }catch(err){
            err.message = "Failed to Sign up"
            err.status = 400;
            throw err;
        }
    }

    static findOneByUserId = async (req)=>{
        const user_id = req;

        const existed = await User.findOneByUserId(user_id);
        
        if(existed==null){
            let err = new Error();
            err.message = "User_Id not Found";
            err.status = 400;
            throw err;
        }

        return existed;
    }

    
}