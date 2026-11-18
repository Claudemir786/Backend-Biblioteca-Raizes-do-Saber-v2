import { Request, Response } from "express";
import { makeCreateUser } from "../../main/factories/user/makeCreateUser.js";
import { makeLoginUser } from "../../main/factories/user/makeLoginUser.js";
import { User } from "../../domain/entities/User.js";
import { changeNameLastName } from "../../main/factories/user/changeNameLastName.js";
import { changeEmailFactory } from "../../main/factories/user/changeEmail.js";
import { makeDeleteUser } from "../../main/factories/user/makeDeleteUser.js";



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

            const result:object | null = await loginCaseUse.login(email,password);

            if(!result){
                return res.status(401).json({success:false, message:"usuário não encontrado"})
            }

            return res.status(200).json({success:true, user:result});
            
        } catch (error) {
            console.error("Falha ao relaizar o login: ", error);
            return res.status(400).json({success:false, message:"Usuário não encontrado"});
        }
    }

    async updateNameLastName(req:Request<{},{},{},{name:string,lastName:string}>, res:Response):Promise<Response>{
        try {
            console.log("Dados recebidos: ", req.query);
            const {name,lastName} = req.query;

            if(!name || !lastName){
                return res.status(401).json({success:false, message:"Dados enviados incorretamente"});
            }
            
            const useCase= changeNameLastName();
            const result = await useCase.change(name,lastName);

            if(!result)throw new Error("dados não foram alterados");

            return res.status(200).json({success:true, message:"nome e sobre nome alterados com sucesso!"});
            
        } catch (error) {
            console.error("Erro controller: ", error);
            return res.status(400).json({success:false, message:"não foi possível alterar nome e sobrenome"});
        }

    }

    async updateEmail(req:Request<{},{},{},{email:string}>, res:Response):Promise<Response>{
        try {

            const {email}= req.query;

            if(!email)return res.status(401).json({success:false,message:"dados enviados incorretamente"})

            const useCase = changeEmailFactory();

            const result = await useCase.changeEmail(email)

            if(!result)throw new Error("não foi possível alterar o e-mail")

            return res.status(200).json({success:true, message:"Email de usuário alterado com sucesso"});                
            
        } catch (error) {
            console.error("Erro controller: ", error);
            return res.status(400).json({success:false, message:"Não foi possível alterar email do usuário"});
        }
    }


    async delete(req:Request<{},{},{id:number}>, res:Response):Promise<Response>{
        try {

            const {id} =req.body;

            if(!id){
                return res.status(401).json({success:true, message:"dados enviados incorretamente"});
            }

            const useCase = makeDeleteUser();

            const result = useCase.deleteUser(id);

            if(!result)throw new Error("não foi possível deletar usuário");

            return res.status(200).json({success:true, message:"usuário excluído com sucesso"});
            
        } catch (error) {
            console.error("Erro: ", error);
           return res.status(400).json({success:false, message:"não foi possível dletear usuário"});
        }
    }

    async searchUser(){

    }
}