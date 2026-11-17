export class User{

    id:number;
    userName:string;
    lastName:string;
    email:string;
    password:string;
    is_admin:boolean;
    is_employee:boolean;
    is_active:boolean

    constructor(
      id:number,name:string,lastName:string,email:string,password:string
    ){
        this.id = id;
        this.email =email;
        this.lastName = lastName;
        this.userName = name;
        this.password = password;
        this.is_admin = false;
        this.is_employee = false;
        this.is_active = true;
    }

    setIsAdmin(admin:boolean){
        this.is_admin = admin;
    }
    setEmployee(employee:boolean){
        this.is_employee = employee; 
    }
    setIsActive(active:boolean){
        this.is_active =active; 
    }


   


   


}