import { DeleteBookUseCase } from "../../../aplication/useCases/book/deleteBookUseCase.js";
import { MysqlBookRepositories } from "../../../infrastructure/repositories/MysqlBookRepository.js";



export default function makeDeleteBook(){

    const bookRepository = new MysqlBookRepositories();

    const bookUseCase = new DeleteBookUseCase(bookRepository);

    return bookUseCase;
}