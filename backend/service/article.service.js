import Article from "../models/Article";

export class ArticleService{
    static read = async (req)=>{
        const {user_id,node_id} = req;

        const existed = await Article.findOneByUserIdNodeId(user_id,node_id);

        if(existed==null){
            let err = new Error();
            err.message = "Article not Found";
            err.status = 400;
            throw err;
        }

        return existed;
    };

    static write = async (req)=>{
        const article = req;

        const existed = await Article.findOneByUserIdNodeId(article.user_id,article.node_id);

        if(existed != null){
            let err = new Error();
            err.message = "Article user_id node_id is Duplicate";
            err.status = 400;
            throw err;
        }
        console.log(article);
        const result = await Article.write(article);
        console.log(result);
        return result;
    }
}