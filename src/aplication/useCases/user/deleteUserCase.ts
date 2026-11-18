import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";


export class DeleteUserCase{

    constructor(
        private userRepository:IUserRepository
    ){}

    async deleteUser(id:number):Promise<boolean>{
        try {

            const result = await this.userRepository.delete(id);

            if(!result)throw new Error("Falaha ao deletar usuário na base da dados");

            return true;
            
        } catch (error) {
            console.error("Erro UseCase: ", error);
            return false;
        }

    }
}