import jwt from "jsonwebtoken"
import crypto from "crypto"

export class AuthService{
    static createToken = async (req)=>{
        const {user_id,user_pw} = req;

        const token = jwt.sign({
            user_id,user_pw
        },
        process.env.JWT_KEY,
        {
            expiresIn:'3h',
            issuer: "spectrum.com",
            subject: "userInfo"
        });
        return token;
    };

    static verifyUserPw = async (req)=>{
        const {user_pw,input_pw} = req;
        
        const encrypted = crypto
            .createHmac("sha1", process.env.PASSWORD_KEY)
            .update(user_pw)
            .digest("base64");

        if( encrypted !== input_pw){
            let err = new Error();
            err.message = "Your passwords do not match"
            err.status = 400;
            throw err;
        }
        return true;
    };
}