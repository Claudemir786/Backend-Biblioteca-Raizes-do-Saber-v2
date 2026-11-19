import { Book } from "../entities/Book.js";

export interface IBookrepository{

    //busca os livros por categoria
    searchByCategory(genre:string):Promise<null | Book[]>;

    //busca livro por nome
    searchByTitle(title:string):Promise<null | Book[]>;

    //adiciona livro
    addBook(book:Book):Promise<boolean>;

    //deleta livro do estoque
    deleteBook(idBook:number):Promise<boolean>;

    //altera alguma informação do livro
    updateBook(book:Book):Promise<null | Book>;
    



}