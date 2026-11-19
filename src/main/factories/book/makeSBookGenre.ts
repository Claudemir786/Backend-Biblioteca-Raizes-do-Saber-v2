import { SearchBookGenreUseCase } from "../../../aplication/useCases/book/searchBookGenreUseCase.js";
import { MysqlBookRepositories } from "../../../infrastructure/repositories/MysqlBookRepository.js";


export function makeSBookGenre(){
    const bookRepository = new MysqlBookRepositories();
    const bookUseCase = new SearchBookGenreUseCase(bookRepository);

    return bookUseCase;
}