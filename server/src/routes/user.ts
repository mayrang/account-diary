import { isEmpty, validate } from "class-validator";
import {Router, Request, Response} from "express"
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middlewares/user";

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

router.post("/login", async (req:Request, res:Response) => {
    const {email, password} = req.body;
    try{
        if(isEmpty(email)) return res.status(400).json({email: "이메일은 비워둘 수 없습니다."});
        if(isEmpty(password)) return res.status(400).json({password: "비밀번호는 비워둘 수 없습니다."});

        const user = await User.findOneBy({email});
        if(!user) return res.status(400).json({email: "해당하는 이메일이 존재하지 않습니다."});

        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword) return res.status(400).json({password: "비밀번호가 틀렸습니다."});
        console.log(email);
        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY);
        res.set("Set-Cookie", cookie.serialize("token", token, {httpOnly: true, maxAge: 60 * 30, path: "/", domain: "http://43.200.244.102/"}));
        res.status(200).json({token, user});
    }catch(err:any){
        console.log(err);
        return res.status(500).json({error: "로그인 과정에서 서버 에러"});
    }
});

router.get("/me", userMiddleware, async (_:Request, res:Response) => {
    try{    
        const user = res.locals.user;
        if(!user) return res.status(400).json({error: "해당하는 유저가 존재하지 않습니다."});
        return res.status(200).json(user);
    }catch(err:any){
        console.log(err);
        return res.status(500).json({error: "로그인 체크 과정에서의 서버 에러"});
    }
});

router.get("/logout",  async (_:Request, res:Response) => {
    try{
        res.set("Set-Cookie", cookie.serialize("token", "", {httpOnly: true, sameSite: "strict", expires: new Date(0), path: "/"}));
        return res.send("로그아웃 성공");
    }catch(err:any){
        console.log(err);
        return res.status(500).json({error: "로그아웃 과정에서의 에러"});
    }
})

export default router;