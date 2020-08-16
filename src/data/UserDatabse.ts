import { BaseDatabase } from './BaseDatabase';
import { UserSignupDTO, User } from '../model/User';

export class UserDatabase extends BaseDatabase{
    private static COLUMN_NAME_BANDA: string = "email"
    private static TABLE_NAME = "USERS_LAMA"
    
    public async signup(user: UserSignupDTO){
        try {
            await super.getConnection()
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
            })
            .into(UserDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
        await BaseDatabase.destroyConnection();
    }

    public async getUserByEmail(email: string): Promise<User>{
        try {
            const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({email});

            return User.toUserModel(result[0]);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
        await BaseDatabase.destroyConnection();
    }

    public async userAlreadyExists(email: string): Promise<any> {
        const result = await this.getConnection()
            .raw(`
                SELECT COUNT(*) as quantity FROM ${UserDatabase.TABLE_NAME}
                WHERE ${UserDatabase.COLUMN_NAME_BANDA}="${email}"`
            );
        return result[0][0]

        await BaseDatabase.destroyConnection();
    }
}