import { Request, Response } from "express";
import { makeSBookGenre } from "../../main/factories/book/makeSBookGenre.js";
import makeSearchBookByTitle from "../../main/factories/book/makeSBookTitle.js";
import { Book } from "../../domain/entities/Book.js";
import makeCreateBook from "../../main/factories/book/makeCreateBook.js";
import makeDeleteBook from "../../main/factories/book/makeDeleteBook.js";
import makeUpdateBook from "../../main/factories/book/makeUpdateBook.js";


type PostBook = {
    id:number;
    title:string;
    author:string;
    page:number;
    genre:string;
    publisher:string;
    quantity:number;
    publication_date:string;
    url_img:string;
    isbn:string;
}

export class BookController{

    async searchbyGenre(req:Request<{},{},{},{genre:string}>,res:Response):Promise<Response>{
        try {

            const {genre} = req.query;
            if(!genre)return res.status(401).json({success:false, message:"dados enviados incorretamente"});

            const bookUseCase = makeSBookGenre();

            const books = await bookUseCase.searchBookGenre(genre);

            if(!books)throw new Error("livros não encontrados");

            return res.status(200).json({success:true, books:books});
            
        } catch (error) {
            console.error("Falha ao buscar e encontrar livros por genero: ", error);
            return res.status(400).json({success:false,message:"Falha ao encontrar dados"});
        }
    }

    async searchByTitle(req:Request<{},{},{},{title:string}>, res:Response):Promise<Response>{
        try {

            const{title} = req.query;
            if(!title){
                return res.status(401).json({success:false, message:"dados enviados incorretamente"});
            }

            const bookUseCase = makeSearchBookByTitle();
            const result = await bookUseCase.search(title);
            
            if(!result)throw new Error("Livro ou livros não encontrados e retornados");

            return res.status(200).json({success:true,books:result})

            
        } catch (error) {
            console.error("Falha ao buscar livro: ", error);
            return res.status(400).json({success:false, message:"Livro não encontrado na base de dados"});
        }

    }

    async createBook(req:Request<{},{},PostBook>, res:Response):Promise<Response>{
        try {
            
            const{title,author,page,genre,publisher,quantity,publication_date,url_img,isbn} = req.body;

            if(!title || !author || !page || !genre || !publisher || !quantity || !publication_date || !url_img || !isbn)return res.status(401).json({success:false, message:"dados enviados incorretamente"});
            
            const bookUseCase = makeCreateBook();
            
            const sendBook = new Book(0,title,author,page,genre,publisher,quantity,publication_date,url_img,isbn); 

            const result = await bookUseCase.createBook(sendBook);

            if(!result)throw new Error("Livro não foi adicionado");

            return res.status(201).json({success:false, message:"Livro adicionado com sucesso"});
            
        } catch (error) {
            console.error("Falha ao adicionar novo livro: ", error);
            return res.status(400).json({success:false, message:"Não foi possível adicionar novo livro"});
        }
    }

    async deleteBook(req:Request<{},{},{idBook:number}>, res:Response):Promise<Response>{
        try {

            const{idBook} = req.body;

            if(!idBook)return res.status(401).json({success:false, message:"Dados enviados incorretamente"});

            const useCase = makeDeleteBook();
            const resultDelete = await useCase.delete(idBook);

            if(!resultDelete)throw new Error("exclusão de livro não foi concluida com sucesso!");

            return res.status(200).json({success:false,message:"Livro excluído com sucesso"});
            
        } catch (error) {
            console.error("Erro: ", error);
            return res.status(400).json({success:false, message:"não foi possível deletar livro da base de dados"});
        }
    }

    async updateBook(req:Request<{},{},Book>, res:Response):Promise<Response>{
        try {
           
            const {id,title,author,page,genre,publisher,quantity,publication_date,url_img,isbn} = req.body;
            
            if(!id || !title || !author || !page || !genre || !publisher || !quantity || !publication_date || !url_img || !isbn){
                return res.status(401).json({success:false, message:"Dados enviados incorretamente"});
            }

            const bookUpdate = new Book(id,title,author,page,genre,publisher,quantity,publication_date,url_img,isbn)

            const bookUseCase = makeUpdateBook();
            const resultUpdate = await bookUseCase.update(bookUpdate);

            if(!resultUpdate)throw new Error("Falha ao fazer update de livro");
            
            return res.status(200).json({success:true, book:resultUpdate});
            
        } catch (error) {
            console.error("Error: ", error);
            return res.status(400).json({success:false, message:"Não foi possível realizar alteração de dados do livro"});
        }
    }
}