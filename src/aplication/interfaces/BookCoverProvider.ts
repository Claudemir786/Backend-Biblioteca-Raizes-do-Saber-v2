import { BookApi } from "../../domain/entities/BookAPi.js";


export interface BookCoverProvider{

    searchImgByTitle(title:string):Promise<null | BookApi[]>;
}