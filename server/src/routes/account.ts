import { instanceToPlain } from "class-transformer";
import { Request, Response, Router } from "express";
import { Between } from "typeorm";
import { Account } from "../entity/Account";
import { userMiddleware } from "../middlewares/user";


const router = Router();

router.post("/create", userMiddleware, async (req:Request, res:Response) => {
    const {type, value, content} = req.body;
    try{

        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "유저 정보가 없습니다."})
        if(type!=="spending" && type !== "income") return res.status(400).json({error: "올바른 Type이 아닙니다."});
        if(content.trim() === "") return res.status(400).json({error: "내용을 입력해주세요."});
        if(value.trim() === "") return res.status(400).json({error: "금액을 입력해주세요."});
        if(isNaN(Number(value))) return res.status(400).json({error: "금액에는 숫자만 입력할 수 있습니다."});
        const account = new Account();
        account.type = type;
        account.value = value;
        account.content = content;
        account.user = user;
        await account.save();
        return res.send("텅장 저장 성공");
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "텅장 생성 과정에서 서버 에러"});
    }
});

router.get("/loadList", userMiddleware, async (req:Request, res:Response) => {

    const {year, month} = req.query;
    try{
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "유저 정보가 없습니다."})
        if(isNaN(Number(year)) || isNaN(Number(month))) return res.status(400).json({error: "query string 에러"});

        const accountList = await Account.find({
            where: {
                createAt: Between(
                    new Date(parseInt(year as string), parseInt(month as string)-1, 1),
                    new Date(parseInt(year as string), parseInt(month as string), 0),
                ),
                userId: user.userId
            },
            order: {
                createAt: "DESC"
            }
            
        });
        console.log(instanceToPlain(accountList));
        // expose 포함 시키고 싶을때는 find 후 instanceToPlain
        return res.status(200).send(instanceToPlain(accountList));
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "텅장 목록 가져오는 과정에서 서버 에라"});
    }
});

router.get("/loadSingle/:accountId", userMiddleware, async (req:Request, res:Response) => {
    const {accountId} = req.params;
    try{
        const user = res.locals.user;
        if(!accountId || accountId.trim() === "" || isNaN(Number(accountId))) return res.status(400).json({error: "올바른 파라미터값이 아닙니다."});
        
        const account = await Account.findOne({
            where: {
                accountId: parseInt(accountId)
            }
        });

        if(account.userId !== user.userId) return res.status(400).json({error: "권한이 존재하지 않습니다."});
        return res.json(account);

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "텅장 가져오는 과정에서 서버 에러"});
    }
});



export default router;