export class User{

    id:number;
    userName:string;
    lastName:string;
    email:string;
    password:string;

    constructor(
      id:number,name:string,lastName:string,email:string,password:string
    ){
        this.id = id;
        this.email =email;
        this.lastName = lastName;
        this.userName = name;
        this.password = password;
    }


}