import { UserRole } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import { UserDatabase } from '../data/UserDatabse';
import { UserSignupDTO, UserLoginDTO } from '../model/User';
import { User } from './../model/User';
import HashManager from './../services/HashManager';

export class UserBusiness{
    private userDb = new UserDatabase();

    public async createId(name: string, email: string, password: string, role: UserRole): Promise<string>{
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();
        return id
    }

    public async signup(user: UserSignupDTO) {

        await this.userDb.signup(user);
    }

    public async getUserByEmail(input: UserLoginDTO){
        const userDb = new UserDatabase();
        const user: User = await userDb.getUserByEmail(input.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(input.password, user.getPassword())

        if(!hashCompare){
            throw new Error("Senha inválida!")            
        }

        return user
    }

}