import { ChangeEmailUserCase } from "../../../aplication/useCases/user/changeEmailUserCase.js";
import { MySqlUserRepository } from "../../../infrastructure/repositories/MySqlUserRepository.js";


export function changeEmailFactory(){

    const changeEmailMySql = new MySqlUserRepository();

    const useCaseChangeEmail = new ChangeEmailUserCase(changeEmailMySql);

    return useCaseChangeEmail
}