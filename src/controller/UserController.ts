import { Request, Response } from "express";
import HashManager from '../services/HashManager';
import { UserBusiness } from '../business/UserBusiness';
import { Authenticator } from '../services/Authenticator';
import { UserInputDTO, UserSignupDTO, UserLoginDTO } from '../model/User';
import { UserDatabase } from './../data/UserDatabse';

export class UserController{
    public async signup(req: Request, res: Response){
        try {
            if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
                throw new Error("Invalid input");
            }
            if (req.body.email.indexOf("@") === -1) {
                throw new Error("Invad email address");
            }
            if (req.body.password.lenght < 6) {
                throw new Error("Invalid password lenght");
            }
            
            const newUser = new UserDatabase();
            const emailUser = await newUser.userAlreadyExists(req.body.email);

            if (emailUser.quantity !== 0) {
                throw new Error("Você já está cadastrado! Por favor faça login.");
            }
            
            const input: UserInputDTO ={
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(input.password);

            const userBusiness = new UserBusiness();
            const userId = await userBusiness.createId(input.name, input.email, input.password, input.role)

            const user: UserSignupDTO = {
                id: userId,
                name: input.name,
                email: input.email,
                password: hashPassword,
                role: input.role
            };

            await userBusiness.signup(user);

            const authenticator = new Authenticator();
            const acessToken = authenticator.generateToken({id: userId, role: input.role})

            res.status(200).send({token: acessToken})

        } catch (error) {
            res.status(400).send({error: error.message})
        }
    }

    public async login(req: Request, res: Response){

        try {
            if (!req.body.email || !req.body.password) {
                throw new Error("Invalid input");
            }
            if (req.body.email.indexOf("@") === -1) {
                throw new Error("Invad email address");
            }

            const input: UserLoginDTO = {
                email: req.body.email,
                password: req.body.password,
            }

            const userBusiness = new UserBusiness();
            const user = await userBusiness.getUserByEmail(input);

            const authenticator = new Authenticator();
            const acessToken = authenticator.generateToken({ id: user.getId(), role: user.getRole() })

            res.status(200).send({ token: acessToken })

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}