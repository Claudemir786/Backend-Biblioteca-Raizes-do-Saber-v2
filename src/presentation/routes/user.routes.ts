import { Router } from "express";
import { userController } from "../controllers/userController.js";


const routeUser = Router();


const usercontroll = new userController();

routeUser.get("/", usercontroll.test);
routeUser.post("/create", usercontroll.create);
routeUser.post("/login", usercontroll.login);
routeUser.put("/changeName", usercontroll.updateNameLastName);
routeUser.put("/changeEmail", usercontroll.updateEmail);
routeUser.put("/delete", usercontroll.delete);
routeUser.get("/searchUser", usercontroll.searchUser);

export default routeUser;