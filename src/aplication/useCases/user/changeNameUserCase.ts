import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";

export class ChangeNameUserCase{

    constructor(
        private userRepository:IUserRepository
    ){}

    async change(newName:string,newLastName:string):Promise<null | boolean>{
        try {

            const resultChangeName = await this.userRepository.changeName(3,newName,newLastName);
            if(!resultChangeName)throw new Error("nome e sobrenome não foram alterados!");

            return true;

        } catch (error) {
            console.error("UseCase Error: ", error);            
            return null
        }


    }
}