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
    };

    static getUserById = async (req,res,next)=>{
        try{
            const result = await UserService.findOneByUserId(req.params.user_id);
            return res.status(200).json({
                 "success":true,
                "message":"find user success",
                "result":result
            });
        }catch(err){
            next(err);
        }
    };
}