import { Book } from "../../../domain/entities/Book.js";
import { IBookrepository } from "../../../domain/repositories/IBookRepository.js";


export class UpdateBookUseCase{

    constructor(
        private bookRepository:IBookrepository
    ){}

    async update(book:Book):Promise<null | Book>{
        try {

            const bookUpdate = await this.bookRepository.updateBook(book);

            if(!bookUpdate)throw new Error("Não foi possível fazer o update e retornar dados do livro");

            return bookUpdate;
            
        } catch (error) {
            console.error("Erro: ", error);
            return null;
        }
    }
}