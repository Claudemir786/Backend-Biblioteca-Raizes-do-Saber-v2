import { Router } from "express";
import { BookController } from "../controllers/bookController.js";

const routeBook = Router();

const bookController = new BookController();

routeBook.get("/search/genre", bookController.searchbyGenre);

export default routeBook;