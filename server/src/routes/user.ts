import { validate } from "class-validator";
import {Router, Request, Response} from "express"
import { User } from "../entity/User";


const router = Router();

const mapErrors = (errors:Object[]) => {
    return errors.reduce((prev:any, errorObj:any) => {
        prev[errorObj.property] = Object.entries(errorObj.constraints)[0][1];
        return prev;
    } , {})
}

router.post("/register", async (req:Request, res:Response) => {
    const {email, nickname, password, checkPassword} = req.body;
    try{
        const emailUser = await User.findOneBy({email});
        const nicknameUser = await User.findOneBy({nickname});
        if(emailUser) return res.status(400).json({error: "이메일이 중복됐습니다."});
        if(nicknameUser) return res.status(400).json({error: "닉네임이 중복됐습니다."});
        if(password !== checkPassword) return res.status(400).json({error: "비밀번호가 일치하지 않습니다."});
        const user = new User();
        user.email = email;
        user.password = password;
        user.nickname = nickname;   
        const errors = await validate(user);

        if(errors && errors.length > 0){
            return res.status(400).json(mapErrors(errors));

        }
        await user.save();
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "회원가입 과정에서 서버 에러"});
    }
});



export default router;