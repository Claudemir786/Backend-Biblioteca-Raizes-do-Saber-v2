import { Request, Response } from "express";
import { makeSBookGenre } from "../../main/factories/book/makeSBookGenre.js";

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
}