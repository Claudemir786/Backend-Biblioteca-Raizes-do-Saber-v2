import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import pool from "../database/connection.js";
import { ResultSetHeader,RowDataPacket } from "mysql2";



export class MySqlUserRepository implements IUserRepository{

    async createUser(user:User): Promise<boolean> {
        
       try {
         const [rows] = await pool.query<ResultSetHeader>(`INSERT INTO users(user_name,last_name,email,password)
                                                            VALUES(?,?,?,?)`, [user.userName,user.lastName,user.email,user.password]);
        
        if(rows.affectedRows === 0 )throw new Error("O insert de users não funcionou");
        
        console.log("usuário adicionado no banco com sucesso!!");

        return true;
        
       } catch (error) {
        console.error("Falha ao adicionar usuário no banco de dados");
        return false
       }
    }

    async login(email: string, password: string): Promise<object> {
        
        console.log("buscando usuário na base de dados");
        return{id:1}

    }



}