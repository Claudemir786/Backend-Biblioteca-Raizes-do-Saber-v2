import { Router } from "express";
import { SearchBookCoverController } from "../controllers/searchBookCoverController.js";

const routerCoverBook = Router();

const bookCoverController = new SearchBookCoverController();


routerCoverBook.get("/search", bookCoverController.search);

export default routerCoverBook;