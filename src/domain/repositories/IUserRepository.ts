import { User } from "../entities/User.js";

export interface IUserRepository{
    
    createUser(user:User):Promise<boolean>;

    login(email:string):Promise<User>;

    changeName(id:number, name:string, lastName:string):Promise<null | boolean>;

    changeEmail(id:number, email:string):Promise<null | boolean>;

    delete(id:number):Promise<boolean>;

    searchUser(name:string):Promise<null | User[]>;
}