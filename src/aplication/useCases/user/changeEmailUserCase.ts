import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";


export class ChangeEmailUserCase{

    constructor(
        private userrepository:IUserRepository
    ){}

    async changeEmail(email:string):Promise<null | boolean>{
        try {
            //verifica se o email é valido
             const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
             if(validEmail.test(email)){
                console.log("Email valido!!");
                
             }else{
                throw new Error("Formato de email invalido para alteração");
             }
            
            //depois colocar a busca de id do usuário bem aqui


            const resultChangeEmail = await this.userrepository.changeEmail(3,email);

            if(!resultChangeEmail)throw new Error("falha ao alterar email!");

            return true;
            
        } catch (error) {
            console.error("Erro userCase: ", error);
            return null
        }
    }
}