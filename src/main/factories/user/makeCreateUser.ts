import { CreateUserUseCase } from "../../../aplication/useCases/user/createUserCase.js";
import { BcryptHasher } from "../../../infrastructure/cryptography/BcryptHasher.js";
import { MySqlUserRepository } from "../../../infrastructure/repositories/MySqlUserRepository.js";


export function makeCreateUser(){

    const userRepository = new MySqlUserRepository();//cria a instancia de execução do banco 
    const passwordHasher = new BcryptHasher();

    const createUserUseCase = new CreateUserUseCase(
        userRepository,
        passwordHasher
    
    );//cria instacia de caso de uso e envia a classe que faz alterações no banco

    return createUserUseCase;
}