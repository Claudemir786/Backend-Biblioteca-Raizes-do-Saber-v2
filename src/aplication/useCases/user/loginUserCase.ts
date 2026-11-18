
import e from "cors";
import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import { PasswordHasher } from "../../interfaces/PasswordHasher.js";
import { verifyPasswordEmail } from "./createUserCase.js";
import { User } from "../../../domain/entities/User.js";

export class LoginUserCase{

    constructor(
        private userRepository : IUserRepository,
        private passwordHash: PasswordHasher
    ){}

     async login(email:string, password:string):Promise<object | null>{

        try {
            console.log("casos de uso de login....");
            console.log("Verificando email e senha... ")
            const verifyEmailPassword:boolean = verifyPasswordEmail(password,email);
            
            if(!verifyEmailPassword)throw new Error("Email e senha invalidos...");
            console.log("Email e senha são validos");

            //guarda o usuário encontrado
            const user:User = await this.userRepository.login(email);   

            if(user.id === 0 )throw new Error("usuário não encontrado")
            
            if(user.is_admin || user.is_employee){
                //se for funcionario
            if(user.is_employee){
                return{
                id:user.id,
                name:user.email,
                employee:true
                    }     
                }

            //se for admin
            if(user.is_admin){
                return{
                id:user.id,
                name:user.email,
                admin:true  
                    }   
                }
            }

            //se a conta estiver desativada
            if(!user.is_active){
                console.log("Conta de usuário está inativa");
                return null;
            }

            //verifica o hash de senha 
           const verifyBryptPassword = await this.passwordHash.comparePasswordHash(password,user.password);
            
            if(!verifyBryptPassword){
                console.log("senha inválida")
                return null 
            }


            return{
                id:user.id,
                name:user.email
            }            
            
        } catch (error) {
            console.error("Falha ao verificar usuário: ", error);
            return null;
        }
        
       
    }
}