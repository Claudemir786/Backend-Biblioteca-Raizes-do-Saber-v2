import { User } from "../entities/User.js";

export interface IUserRepository{
    
    createUser(user:User):Promise<boolean>;

    login(email:string,password:string):Promise<object>;
}