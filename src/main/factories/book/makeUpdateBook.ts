import { UpdateBookUseCase } from "../../../aplication/useCases/book/updateBookUseCase.js";
import { MysqlBookRepositories } from "../../../infrastructure/repositories/MysqlBookRepository.js";


export default function makeUpdateBook(){
 
    const bookRepository = new MysqlBookRepositories();
    const bookUseCase = new UpdateBookUseCase(bookRepository);

    return bookUseCase;
    
}