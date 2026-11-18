
import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import pool from "../database/connection.js";
import { ResultSetHeader,RowDataPacket } from "mysql2";


    type ReadUser = RowDataPacket &{
        id:number,
        user_name:string,
        last_name:string,
        email:string,
        password:string,
        is_admin:boolean,
        is_employee:boolean,
        is_active:boolean
    }

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



    async login(email: string): Promise<User> {
        
        try {
            console.log("Fazendo busca de usuário no banco ....");

            const [result] = await pool.query<ReadUser[]>(`SELECT * FROM users WHERE email = ?`, [email]);

            if(result.length === 0 )throw new Error("Usuário não encontrado");
            
            const findedUser = result[0];

            console.log("Usuário encontrado com sucesso!");

            const user = new User(findedUser.id,findedUser.user_name,"",findedUser.email,findedUser.password);

            if(findedUser.is_employee){
                user.setEmployee(true);
                return user;
            }
            if(findedUser.is_admin){
                user.setIsAdmin(true);
                return user;
            }
                
            return user;
            
        } catch (error) {
            console.error("Falha ao encontrar usuário no banco de dados: ", error);
            return new User(0,"","","","")
        }
    }
     
    async changeName(id: number, name: string, lastName: string): Promise<null | boolean> {

       try {
            const [rows] = await pool.query<ResultSetHeader>(`UPDATE users SET user_name = ?,last_name = ? WHERE id = ?`, [name,lastName,id]);

            if(rows.affectedRows === 0)throw new Error("Update de name e lastName não foi relaizado no banco de dados");
            
            console.log("Nome e sobrenome alterados com sucesso....");

            return true;

        
       } catch (error) {
            console.error("Erro Banco: ", error);
            return null
       }
    }

    async changeEmail(id: number, email: string): Promise<null | boolean> {
         try {
            const [rows] = await pool.query<ResultSetHeader>(`UPDATE users SET email = ? WHERE id = ?`, [email,id]);

            if(rows.affectedRows === 0)throw new Error("Update de email não foi relaizado no banco de dados");
            
            console.log("Email alterado com sucesso...."); 

            return true;
        
       } catch (error) {
            console.error("Erro Banco: ", error);
            return null
       }
       
    }

    async delete(id: number): Promise<boolean> {
    
        try {

            const [result] = await pool.query<ResultSetHeader>(`UPDATE users SET is_active = false WHERE id = ? `,[id] );

            if(result.affectedRows === 0 )throw new Error("Falha ao deixar o usuário inativo no banco de dados");

            console.log(`usuário "deletado" com sucesso!!`);
            return true;
            
        } catch (error) {
            console.error("Error Banco: ", error);
            return false;
        }

    }

    async searchUser(name: string): Promise<null | User[]> {
        try {

            const [result] = await pool.query<ReadUser[]>(`SELECT FROM users WHERE user_name = ?`, [name]);
            
            if(result.length === 0 )throw new Error("Falha ao encontrar usuário com o nome recebido");
            let userArray:User[] = [];

            result.map(u =>{
                const user = new User(u.id,u.user_name,u.last_name,u.email,"");
                userArray.push(user);
            })
            
            console.log("Usuários encontrados: ", userArray);
            return userArray;
            
        } catch (error) {
            console.error("Erro no banco: ", error);
            return null;
        }
    }

    


}