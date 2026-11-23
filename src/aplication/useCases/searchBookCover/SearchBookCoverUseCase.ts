
import { BookApi } from "../../../domain/entities/BookAPi.js";
import { BookCoverProvider } from "../../interfaces/BookCoverProvider.js";

export class SearchBookCoverUseCase{
    constructor(
        private coverBookRepository:BookCoverProvider 
    ){}

    async imageAndDescription(title:string):Promise<null | BookApi[]>{

        try {

            const arrayBooks = await this.coverBookRepository.searchImgByTitle(title);

            if(!arrayBooks)throw new Error("Falha ao buscar imagem e descrição do livro");
            console.log("Lista de livros encontrada com sucesso!!");

            return arrayBooks;
            
        } catch (error) {
            console.error("Error useCase: ", error);
            return null
        }

    }
}

