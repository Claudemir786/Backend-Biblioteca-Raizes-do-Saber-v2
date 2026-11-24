import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Book } from "../../domain/entities/Book.js";
import { IBookrepository } from "../../domain/repositories/IBookRepository.js";
import pool from "../database/connection.js";

type ReadBook = RowDataPacket&{
    id:number,
    title:string,
    author:string,
    page:number,
    genre:string,
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
        try {

            const [result] = await pool.query<ReadBook[]>(`SELECT * FROM books WHERE title = ?`, [title]);

            if(result.length === 0)throw new Error("Livro não encontrado no banco de dados");


            let arrayBooks:Book[]  = [];

            //inserindo livros retornados em um novo array;
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
                
            });

            return arrayBooks;
            
        } catch (error) {
            console.error("Falha ao encontrar livro pelo título: ", error);
            return null;
        }
    }

    async addBook(book: Book): Promise<boolean> {
        try {

            const [rows] = await pool.query<ResultSetHeader>(`INSERT INTO books
                                                              (title,author,page,genre,publisher,quantity,publication_date,url_img,isbn)
                                                              VALUES(?,?,?,?,?,?,?,?,?)`, 
                                                            [book.title,book.author,book.page,book.genre,book.publisher,book.quantity,book.publication_date,book.url_img,book.isbn]);

            if(rows.affectedRows === 0)throw new Error("Adição de um novo livro não foi efetuado com sucesso no banco de dados");
            
            console.log("Livro adicionado com sucesso");

            return true;
            
        } catch (error) {
            console.error("Falha ao adicionar livro: ", error);
            return false;
        }
    }

    async deleteBook(idBook: number): Promise<boolean> {
        try {

            const [rows] = await pool.query<ResultSetHeader>(`DELETE FROM books WHERE id = ?`, [idBook]);

            if(rows.affectedRows === 0 )throw new Error("Falha ao deletar livro no banco de dados");

            console.log("Livro excluido da base de dados com sucesso!");

            return true;
            
        } catch (error) {
            console.error("Erro: ", error);
            return false;

        }
    }

   async updateBook(book: Book): Promise<null | Book> {
        try {

            const [rows] = await pool.query<ResultSetHeader>(`UPDATE books 
                                                              SET 
                                                                title = ?,
                                                                author = ?, 
                                                                page = ?, 
                                                                genre = ?,
                                                                publisher = ?, 
                                                                quantity = ?, 
                                                                publication_date = ?,
                                                                url_img = ?,
                                                                isbn = ?
                                                              WHERE id = ?`,[book.title,book.author,book.page,book.genre,book.publisher,book.quantity,book.publication_date,book.url_img,book.isbn, book.id]);
            
            if(rows.affectedRows === 0 )throw new Error("Naõ foi possível realizar update corretamente no banco de dados");
            
            //fazendo pesquisa para retornar o livro que foi alternado
            const [result] = await pool.query<ReadBook[]>(`SELECT * FROM books WHERE id = ?`, [book.id]);

            if(result.length === 0 )throw new Error("Falha ao buscar dados do livro alterado");
            
            const returnBook = new Book(
                result[0].id,
                result[0].title,
                result[0].author,
                result[0].page,
                result[0].genre,
                result[0].publisher,
                result[0].quantity,
                result[0].publication_date,
                result[0].url_img,
                result[0].isbn
            );

            return returnBook;
            
        } catch (error) {
            console.error("Erro: ", error);
            return null;
        }    
    }
}