import express from "express";
import routerUser from "../presentation/routes/user.routes.js";
import routeBook from "../presentation/routes/book.routes.js";

const app = express();

app.use(express.json());

app.use("/users", routerUser);
app.use("/book", routeBook);


export default app;