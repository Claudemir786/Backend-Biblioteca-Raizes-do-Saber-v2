import { Request, Response } from "express";
import makeSearchBookCover from "../../main/factories/BookCover/makeSearchBookCover.js";


export class SearchBookCoverController{

    async search(req:Request<{},{},{},{title:string}>, res:Response):Promise<Response>{
        try {
            
            const {title} = req.query;

            console.log("Titulo enviado: ", title)
            if(!title)return res.status(401).json({success:false, message:"Dados enviados incorretamente"});

            const bookUseCase = makeSearchBookCover();

            const arrayBook = await bookUseCase.imageAndDescription(title);
            if(!arrayBook)throw new Error("Livros não encontrados");

            return res.status(200).json({sucess:true, books:arrayBook});
            
        } catch (error) {
            console.error("Falaha ao buscar livros: ", error);
            return res.status(400).json({success:false, message:"falha ao encontra livros"});
        }

    }
}