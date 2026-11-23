import { SearchBookCoverUseCase } from "../../../aplication/useCases/searchBookCover/SearchBookCoverUseCase.js";
import { BookCoverRepository } from "../../../infrastructure/bookCover/bookCoverRepository.js";


export default function makeSearchBookCover(){

    const bookCoverrepository  = new BookCoverRepository();
    const bookCoverUseCase = new SearchBookCoverUseCase(bookCoverrepository)

    return bookCoverUseCase;
}