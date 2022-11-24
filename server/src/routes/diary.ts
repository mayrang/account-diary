import { Request, Response, Router } from "express";
import { Between } from "typeorm";
import { Post } from "../entity/Post";
import { userMiddleware } from "../middlewares/user";


const router = Router();


router.get("/loadList", userMiddleware, async (req:Request, res:Response) => {
    const {year, month} = req.query;
    try{
        console.log(year, month)
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "유저 정보가 없습니다."});
        if(isNaN(Number(year)) || isNaN(Number(month))) return res.status(400).json({error: "query string 에러"});

        const post = await Post.find({
            where: {
                createAt: Between(
                    new Date(parseInt(year as string), parseInt(month as string)-1, 1),
                    new Date(parseInt(year as string), parseInt(month as string), 0),
                ),
                userId: user.userId
            },
            
        });
        return res.json(post);

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "일기 목록 불러오는 과정에서 서버 에러"});
    }
});

router.post("/create", userMiddleware, async (req:Request, res:Response) => {
    const {title, content} = req.body;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "유저 정보가 없습니다."});
        if(title.trim() === "") return res.status(400).json({error: "제목을 비워둘 수 없습니다."});
        if(content.trim() === "") return res.status(400).json({error: "내용은 비워둘 수 없습니다."});
        const post = new Post();
        post.title = title;
        post.content = content;
        post.user = user;
        await post.save();
        return res.send("일기 저장 성공");
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "일기 추가 과정에서 서버 에러"});
    }
});

export default router;