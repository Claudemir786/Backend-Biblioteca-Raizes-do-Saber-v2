import { Book } from "../../../domain/entities/Book.js";
import { IBookrepository } from "../../../domain/repositories/IBookRepository.js";

export class SearchBookGenreUseCase{

    constructor(
        private bookRepository:IBookrepository
    ){}

    async searchBookGenre(genre:string):Promise<null | Book[]>{
        try {

            const books = await this.bookRepository.searchByCategory(genre);

            if(!books){
                throw new Error("Erro useCase lista de livros não encontrada");
            }

            return books;
            
        } catch (error) {
            console.error("Erro: ", error);
            return null;
        }
    }
}