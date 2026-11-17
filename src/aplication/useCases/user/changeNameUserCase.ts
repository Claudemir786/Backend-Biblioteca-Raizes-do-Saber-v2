import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";

export class ChangeNameUserCase{

    constructor(
        private userRepository:IUserRepository
    ){}

    async change(id:number,newName:string,newLastName:string):Promise<null | User>{
        try {


            return null

        } catch (error) {
            
            return null
        }


    }
}