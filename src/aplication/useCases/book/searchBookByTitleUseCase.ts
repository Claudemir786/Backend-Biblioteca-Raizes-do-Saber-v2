import { Book } from "../../../domain/entities/Book.js";
import { IBookrepository } from "../../../domain/repositories/IBookRepository.js";


export class SearchBookByTitle{

    constructor(
        private bookrepository: IBookrepository
    ){}

    async search(title:string):Promise<null | Book[]>{
        try {

            const books = await this.bookrepository.searchByTitle(title);

            if(!books)throw new Error("Livros não encontrados e retornados da conexão com o banco");

            console.log("Livros encontrados com sucesso");

            return books;
            
        } catch (error) {
            console.error("Erro UseCase: ", error);
            return null;
        }
    }
}