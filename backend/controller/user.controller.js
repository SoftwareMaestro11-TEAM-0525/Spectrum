import {UserService} from "../service/user.service"

export class UserController{
    static register = async (req,res,next)=>{
        try{
            const result = await UserService.register(req);
            return res.status(201).json({
                "success":true,
                "message":"register success"
            }); 
        }catch(err){
            next(err);
        }
    }
}