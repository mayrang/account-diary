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

router.get("/loadSingle/:postId", userMiddleware, async (req:Request, res:Response) => {
    const postId = req.params.postId;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "유저 정보가 존재하지 않습니다."});
        if(!postId || postId.trim() === "" || isNaN(Number(postId))) return res.status(400).json({error: "올바른 파라미터값이 아닙니다."});
        const post = await Post.findOne({
            where: {
                postId: parseInt(postId)
            }
        });
       
        return res.json(post);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "일기 로드 과정에서 서버 에러"});
    }
})

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

router.put("/editSingle/:postId", userMiddleware, async (req:Request, res:Response) => {
    const postId = req.params.postId;
    const {title, content} = req.body;
    try{
        const user = res.locals.user;
        if(!postId || postId.trim() === "" || isNaN(Number(postId))) return res.status(400).json({error: "올바른 파라미터값이 아닙니다."});
        if(!user) return res.status(400).json({error: "유저 정보가 없습니다."});
        if(title.trim() === "") return res.status(400).json({error : "제목은 비워둘 수 없습니다."});
        if(content.trim() === "") return res.status(400).json({error: "내용은 비워둘 수 없습니다."});
        const post = await Post.findOne({
            where: {
                postId: parseInt(postId)
            }
        });
        if(!post) return res.status(400).json({error: "해당하는 일기가 없습니다."});
        if(post.userId !== user.userId) return res.status(400).json({error: "수정 권한이 없습니다."});
        post.title = title;
        post.content = content;

        await post.save();
        return res.send("일기 수정 성공")

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "일기 수정 과정에서 서버 에러"});
    }
})

router.delete("/removeSingle/:postId", userMiddleware, async (req:Request, res:Response) => {
    const postId = req.params.postId;
    try{
        const user = res.locals.user;
        if(!postId || postId.trim() === "" || isNaN(Number(postId))) return res.status(400).json({error: "올바른 파라미터값이 아닙니다."});
        if(!user) return res.status(400).json({error: "유저 정보가 없습니다."});
        const post = await Post.findOne({
            where: {
                postId: parseInt(postId)
            }
        });
        if(post.userId !== user.userId) return res.status(400).json({error: "삭제 권한이 없습니다."});
        await post.remove();
        return res.send("삭제 성공");
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "일기 삭제 과정에서 서버 에러"});
    }
})

export default router;