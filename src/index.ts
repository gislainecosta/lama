import dotenv from "dotenv";
import { AddressInfo } from 'net';
import express from "express";
import { userRouter } from './routes/userRouter';
import { bandaRouter } from './routes/bandaRouter';
import { showRouter } from './routes/showrouter';

dotenv.config();
const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/banda", bandaRouter);

app.use("/show", showRouter);

const server = app.listen(3000, () =>{
    if(server){
        const adress = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${adress.port}`);
    }else{
        console.error(`Falha ao rodar o servidor.`)
    }
})
