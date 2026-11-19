import { RowDataPacket } from "mysql2";
import { Book } from "../../domain/entities/Book.js";
import { IBookrepository } from "../../domain/repositories/IBookRepository.js";
import pool from "../database/connection.js";

type ReadBook = RowDataPacket&{
    id:number,
    title:string,
    author:string,
    page:number,
    genre:number,
    publisher:string,
    quantity:number,
    publication_date:string,
    url_img:string,
    isbn:string
}

export class MysqlBookRepositories implements IBookrepository{

    async searchByCategory(genre: string): Promise<null | Book[]> {
        try {
            const [result] = await pool.query<ReadBook[]>(`SELECT * FROM books WHERE genre = ?`, [genre]);

            if(result.length === 0)throw new Error("não foram encontrados dados para esse genero de livro");

            let arrayBooks:Book[] = []

            result.map((b)=>{
                const book = new Book(
                    b.id,
                    b.title,
                    b.author,
                    b.page,
                    b.genre,
                    b.publisher,
                    b.quantity,
                    b.publication_date,
                    b.url_img,
                    b.isbn
                );
                arrayBooks.push(book);
            })

            return arrayBooks;
            
        } catch (error) {
            console.error("Error: ", error);
            return null;
        }
    }

    async searchByTitle(title: string): Promise<null | Book[]> {
        return null;
    }

    async addBook(book: Book): Promise<boolean> {
        return false;
    }

    async deleteBook(idBook: number): Promise<boolean> {
        return false;
    }

   async updateBook(book: Book): Promise<null | Book> {
        return null;
    }
}