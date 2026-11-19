

export interface BookCoverPrivider{

    searchImgByTitle(title:string):Promise<null | string>;
}