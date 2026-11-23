import { BookCoverProvider } from "../../aplication/interfaces/BookCoverProvider.js";
import { BookApi } from "../../domain/entities/BookAPi.js";

type GoogleBooksResponse = {
    totalItems: number;
    items?: {
        id: string;
        volumeInfo: {
            title: string;
            authors?: string[];
            publisher?: string;
            publishedDate?: string;
            description?: string;
            pageCount?: number;
            categories?: string[];
            imageLinks?: {
                thumbnail?: string;
            };
            industryIdentifiers?: {
                type: string;
                identifier: string;
            }[];
        };
    }[];
}

export class BookCoverRepository implements BookCoverProvider{

    async searchImgByTitle(title: string): Promise<null | BookApi[]> {
        try {
                
                const url = new URL(
                    "https://www.googleapis.com/books/v1/volumes"
                );

                url.searchParams.set("q", `intitle:${title}`);
                url.searchParams.set("maxResults", "20");
                url.searchParams.set("langRestrict", "pt");
                url.searchParams.set(
                    "key",
                    process.env.GOOGLE_BOOKS_API_KEY!
                );

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Erro ao buscar livros no Google Books");
                }

                const data: GoogleBooksResponse = await response.json();
                let arrayBooks:BookApi[] = [];

                data.items?.map((b)=>{
                    const book = new BookApi(b.volumeInfo.imageLinks?.thumbnail, b.volumeInfo.description);
                    arrayBooks.push(book);
                });

                return arrayBooks;
            
        } catch (error) {
            console.error("falha ao encontrar imagem e descrição do livro: ", error)
            return null;
        }
    }
}