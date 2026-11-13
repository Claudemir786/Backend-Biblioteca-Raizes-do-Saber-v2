import { Request, Response } from "express";
import { makeCreateUser } from "../../main/factories/user/makeCreateUser.js";
import { makeLoginUser } from "../../main/factories/user/makeLoginUser.js";
import { User } from "../../domain/entities/User.js";



type bodyCreate ={
    name:string,
    lastName:string,
    email:string,
    password:string
    
}

export class userController{


    async test(req:Request, res:Response):Promise<Response>{

       return res.status(200).send("Conexão efetuada com sucesso!");
    }

    async create(req:Request<{},{},bodyCreate>, res:Response):Promise <Response>{
        try {

            
            const {name,lastName,email,password} = req.body;

            if(!name || !lastName || !email || !password){
                return res.status(401).json({success:false, message:"Dados enviados incorretamente"});
            }
            
            //chama a função da factory
            const createUserUseCase = makeCreateUser();
            //instancia um usuário
            const user  = new User(0,name,lastName,email,password);

            const result = await createUserUseCase.create(user);

            if(!result)throw new Error("Falha na criação de usuário");
            

          return res.status(201).json({success:false, message:"Usuário criado com sucesso"});  
            
        } catch (error) {
            console.error("Erro na controller ao realizar a criação de usuário: ", error);
           return res.status(400).json({success:false, message:"Falha ao criar usuário"})
        }
    }

    async login(req:Request<{},{},{email:string, password:string}>, res:Response):Promise<Response>{
        try {
            const {email,password} = req.body;

            console.log(`Dados que chegaram :${email} e ${password}`);

            if(!email || !password){
                return res.status(401).json({success:false, message:"Dados enviados incorretamente"});
            }
            const loginCaseUse = makeLoginUser();

            const result:object = await loginCaseUse.login(email,password);

            return res.status(200).json({success:true, id:result});
            
        } catch (error) {
            console.error("Falha ao relaizar o login");
            return res.status(400).json({success:false, message:"Usuário não encontrado"});
        }
    }

    async updateEmail(){

    }


    async delete(){

    }

}