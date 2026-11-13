import { Router } from "express";
import { userController } from "../controllers/userController.js";


const routeUser = Router();


const usercontroll = new userController();

routeUser.get("/", usercontroll.test);
routeUser.post("/create", usercontroll.create);
routeUser.post("/login", usercontroll.login);


export default routeUser;