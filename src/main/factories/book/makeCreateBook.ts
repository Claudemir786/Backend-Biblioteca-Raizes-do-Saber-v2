import { CreateBookUseCase } from "../../../aplication/useCases/book/createBookUseCase.js";
import { MysqlBookRepositories } from "../../../infrastructure/repositories/MysqlBookRepository.js";


export default function makeCreateBook(){

    const bookRepository = new MysqlBookRepositories();

    const bookUseCase = new CreateBookUseCase(bookRepository);

    return bookUseCase;
}