import express from "express";
import routerUser from "../presentation/routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/users", routerUser);



export default app;