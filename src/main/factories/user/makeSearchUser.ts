import { SearchUserCase } from "../../../aplication/useCases/user/searchUserCase.js";
import { MySqlUserRepository } from "../../../infrastructure/repositories/MySqlUserRepository.js";


export function makeSearchUser(){
    
    const mysqlRepository = new MySqlUserRepository();

    const userUseCase = new SearchUserCase(mysqlRepository);

    return userUseCase;
}