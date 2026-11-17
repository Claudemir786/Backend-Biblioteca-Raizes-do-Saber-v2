import { LoginUserCase } from "../../../aplication/useCases/user/loginUserCase.js";
import { BcryptHasher } from "../../../infrastructure/cryptography/BcryptHasher.js";
import { MySqlUserRepository } from "../../../infrastructure/repositories/MySqlUserRepository.js";


export function makeLoginUser(){

    const userRepository = new MySqlUserRepository();
    const bycrpt = new BcryptHasher();

    const loginUserUseCase = new LoginUserCase(userRepository,bycrpt);

    return loginUserUseCase;
}