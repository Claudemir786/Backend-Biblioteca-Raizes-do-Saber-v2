import { Request, Response } from "express";
import { makeSBookGenre } from "../../main/factories/book/makeSBookGenre.js";
import makeSearchBookByTitle from "../../main/factories/book/makeSBookTitle.js";
import { Book } from "../../domain/entities/Book.js";
import makeCreateBook from "../../main/factories/book/makeCreateBook.js";

type PostBook = {
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
}