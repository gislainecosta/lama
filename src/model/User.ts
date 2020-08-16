import { UserRole } from '../services/Authenticator';

export class User{
    constructor(
        private id: string,
        private email: string,
        private name: string,
        private password: string,
        private role: UserRole
    ){}

    getId(){
        return this.id;
    }


    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

    public static toUserModel(object: any): User{
        return new User(object.id, object.email, object.name, object.password, object.role);
    }
}

export interface UserSignupDTO{
    id: string,
    email: string,
    name: string,
    password: string,
    role: UserRole
}

export interface UserInputDTO{
    email: string, 
    name: string, 
    password: string, 
    role: UserRole
}

export interface UserLoginDTO {
    email: string,
    password: string,
}