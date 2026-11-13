import { LoginUserCase } from "../../../aplication/useCases/user/loginUserCase.js";
import { MySqlUserRepository } from "../../../infrastructure/repositories/MySqlUserRepository.js";


export function makeLoginUser(){

    const userRepository = new MySqlUserRepository();

    const loginUserUseCase = new LoginUserCase(userRepository);

    return loginUserUseCase;
}