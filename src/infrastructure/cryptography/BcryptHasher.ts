import { PasswordHasher } from "../../aplication/interfaces/PasswordHasher.js";
import bcrypt from 'bcrypt'

export class BcryptHasher implements PasswordHasher{

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password,10);
    }

    async comparePasswordHash(password: string, hashedPassword: string): Promise<boolean> {
        
        return await bcrypt.compare(password,hashedPassword);
    }

}