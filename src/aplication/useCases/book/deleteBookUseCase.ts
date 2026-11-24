import { IBookrepository } from "../../../domain/repositories/IBookRepository.js";



export class DeleteBookUseCase{

    constructor(
        private bookRepository: IBookrepository
    ){}

    async delete(idBook:number):Promise<boolean>{

        try {

            const resultDelete = await this.bookRepository.deleteBook(idBook);

            if(!resultDelete)throw new Error("resultado do delete no banco foi false");

            return true;
            
        } catch (error) {
            console.error("Error useCase: ", error);
            return false;
        }

    }
}