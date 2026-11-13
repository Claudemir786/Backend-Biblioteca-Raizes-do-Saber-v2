import cors from 'cors'
import 'dotenv/config'
import app from './main/app.js'
import routeUser from './presentation/routes/user.routes.js';

app.use(cors);

app.use("/users", routeUser);

app.listen(3000, ()=>console.log("Server running at port 3000"));



