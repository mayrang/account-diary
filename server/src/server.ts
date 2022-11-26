import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./data-source";
import hpp from "hpp";
import helmet from "helmet";
import userRoutes from "./routes/user";
import accountRoutes from "./routes/account";
import diaryRoutes from "./routes/diary";

const app = express();

dotenv.config();
if(process.env.NODE_ENV === 'production'){
    app.use(morgan("combined"));
    app.use(hpp());
    app.use(helmet());
}else{
    app.use(morgan("dev"));
    
}
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/diary", diaryRoutes);

let port = 80;


app.listen(port, async () => {
    console.log(`Server running ${port} Port`);
    AppDataSource.initialize()
    .then(() => {
        console.log("database init!");
    })
    .catch((err) => {
        console.log(err);
    })
})