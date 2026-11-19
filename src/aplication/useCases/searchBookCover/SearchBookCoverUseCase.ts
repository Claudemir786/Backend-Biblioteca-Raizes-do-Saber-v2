import { BookCoverPrivider } from "../../interfaces/BookCoverProvider.js";

export class SearchBookCoverUseCase{
    constructor(
        private coverBookRepository:BookCoverPrivider 
    ){}
}

