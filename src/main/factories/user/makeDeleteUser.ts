import { DeleteUserCase } from "../../../aplication/useCases/user/deleteUserCase.js";
import { MySqlUserRepository } from "../../../infrastructure/repositories/MySqlUserRepository.js";


export function makeDeleteUser(){
    const deleteMySql = new MySqlUserRepository();

    const useCaseDelete = new DeleteUserCase(deleteMySql);

    return useCaseDelete;
}