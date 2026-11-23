
export class Book{

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
   

    constructor(
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
){
  this.id = id;
  this.author = author;
  this.genre = genre;
  this.page = page;
  this.publication_date = publication_date;
  this.publisher = publisher;
  this.quantity = quantity;
  this.title = title;
  this.url_img = url_img;
  this.isbn = isbn;
 
}

}