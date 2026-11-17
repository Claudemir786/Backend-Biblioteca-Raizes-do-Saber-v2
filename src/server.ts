import cors from 'cors'
import 'dotenv/config'
import app from './main/app.js'

app.use(cors);

app.listen(3000, ()=>console.log("Server running at port 3000"));



