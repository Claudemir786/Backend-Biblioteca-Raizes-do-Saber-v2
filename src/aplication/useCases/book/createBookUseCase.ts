import { Book } from "../../../domain/entities/Book.js";
import { IBookrepository } from "../../../domain/repositories/IBookRepository.js";


export class CreateBookUseCase{

    constructor(
        private bookRepository : IBookrepository
    ){}


    async createBook(book:Book):Promise<boolean>{
        try {

            const resultInsert = await this.bookRepository.addBook(book);

            if(!resultInsert)throw new Error("Livro não foi adicionado na base de dados");

            return true;
            
        } catch (error) {
            console.error("Erro book UseCase: ", error);
            return false;
        }

    }
}