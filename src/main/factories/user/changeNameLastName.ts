import { ChangeNameUserCase } from "../../../aplication/useCases/user/changeNameUserCase.js";
import { MySqlUserRepository } from "../../../infrastructure/repositories/MySqlUserRepository.js";


export function changeNameLastName(){

    const changeName = new MySqlUserRepository();

    const useCaseChange = new ChangeNameUserCase(changeName);

    return useCaseChange;
}