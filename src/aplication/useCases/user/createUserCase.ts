
import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import { PasswordHasher } from "../../interfaces/PasswordHasher.js";


export class CreateUserUseCase{

    constructor(
        private userRepository : IUserRepository,
        private hashPassword : PasswordHasher
    ){}

    async create(user:User):Promise <boolean>{

       try {

        //verifica se os dados de e-mail e senha são validos
        const verify:boolean = verifyPasswordEmail(user.password,user.email);
        
        if(!verify)throw new Error("Senha ou email são invalidos para criação de usuário");

        const hashP = await this.hashPassword.hash(user.password); 
        
        //console.log("Dados enviados: ", user);
        const userCorrect = new User(0,user.userName,user.lastName,user.email,hashP);

        const result:boolean = await this.userRepository.createUser(userCorrect);
        
        if(result){
            console.log("usuário criado, regra de caso de uso");
            return true;
        }
        return false;
        
       } catch (error) {
        console.error("Erro: ", error);
        return false;
       }
    }

   
}

function verifyPasswordEmail(password:string, email:string):boolean{
    //cria a regra de senha forte com numero,letra Maiuscula e minuscula e caractere especial
    const validPassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    //cria a regra de email valido
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //verifica se a senha e e-mail atende os critérios definidos
    if(validPassword.test(password) && validEmail.test(email)){
        console.log("Senha e e-mail validos para criação")
        return true;
    }else{
        console.log("Email ou senha não são validos para criação de usuário");
        return false;
    }

}
