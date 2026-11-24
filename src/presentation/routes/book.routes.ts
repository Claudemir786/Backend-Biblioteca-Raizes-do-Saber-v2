import { Router } from "express";
import { BookController } from "../controllers/bookController.js";

const routeBook = Router();

const bookController = new BookController();

routeBook.get("/search/genre", bookController.searchbyGenre);
routeBook.get("/search/title", bookController.searchByTitle);
routeBook.post("/create", bookController.createBook);
routeBook.delete("/delete", bookController.deleteBook);
routeBook.put("/update", bookController.updateBook);

export default routeBook;