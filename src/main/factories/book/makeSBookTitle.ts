import { SearchBookByTitle } from "../../../aplication/useCases/book/searchBookByTitleUseCase.js";
import { MysqlBookRepositories } from "../../../infrastructure/repositories/MysqlBookRepository.js";


export default function makeSearchBookByTitle(){

    const msqlRepositories = new MysqlBookRepositories();

    const BookUseCase =  new SearchBookByTitle(msqlRepositories);

    return BookUseCase;
}