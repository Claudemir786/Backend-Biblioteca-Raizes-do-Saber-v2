

export interface PasswordHasher{
    
    hash(password:string):Promise<string>;

    comparePasswordHash(password:string, hashedPassword:string):Promise<boolean>;
}