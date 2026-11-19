import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";


export class SearchUserCase{

    constructor(
        private userRepository:IUserRepository 
    ){}

    async search(name:string):Promise<null | User[]>{
        try {
            console.log("Nome recebido: ", name);

            const result = await this.userRepository.searchUser(name);

            if(!result)throw new Error("Falha no UseCase, usuário não encotrado");

            //colocar aqui a chamada para verofocar os empréstimos e livros 

            console.log("Dados encontrados: ", result);

            return result;
            
        } catch (error) {
            console.error("Erro: ", error);
            return null;
        }
    }
}