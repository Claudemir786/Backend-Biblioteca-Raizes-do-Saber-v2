
export class BookApi{

    url_image: string | undefined;
    description:string | undefined;

    constructor(url_image:string | undefined, description:string | undefined){
        this.url_image = url_image;
        this.description = description;
    }
}