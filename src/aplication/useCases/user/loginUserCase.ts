
import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";

export class LoginUserCase{

    constructor(
        private userRepository : IUserRepository
    ){}

     async login(email:string, password:string):Promise<object>{
        
        console.log("casos de uso de login....");

        const idUser:object = await this.userRepository.login(email,password);
        
        return idUser;
    }
}