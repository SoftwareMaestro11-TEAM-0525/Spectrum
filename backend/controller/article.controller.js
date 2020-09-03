import {ArticleService} from "../service/article.service";

export class ArticleController{
  static read = async (req,res,next)=>{
    try{
        const result = await ArticleService.read(req.params);

        return res.status(200).json({
          "success":true,
          "message":"Get Article success",
          "result":result
        })
    }catch(err){
        next(err);
    }
  };
}