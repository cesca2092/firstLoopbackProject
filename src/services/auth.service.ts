
import { repository } from '@loopback/repository'
import { ServiceKeys as keys } from '../keys/service-keys';
import { Users } from '../models'
import { UsersRepository } from '../repositories'
import { EncryptDecrypt } from './encryptdecrypt.services';
const jwt = require('jsonwebtoken');

export class AuthService{
    constructor(
        @repository(UsersRepository)
        public userRepository: UsersRepository
    ){
        
    }

    async Identify(username:string, password:string):Promise<Users | false>{

    
  
        const userbyusername = await this.userRepository.findOne({where:{username}});
        if(userbyusername){
            const cryptPass = new EncryptDecrypt(keys.MD5).Encrypt(password);
            if(userbyusername.password === cryptPass) return userbyusername;
            
        } else {
            const userbyemail = await this.userRepository.findOne({where:{email:username}});
            if(userbyemail){
                const cryptPass = new EncryptDecrypt(keys.MD5).Encrypt(password);
                if(userbyemail.password === cryptPass) return userbyemail;
            }

        }

        return false;
    }

    async GenerateToken(user: Users){
        user.password = '';
        const token = jwt.sign({
            exp: 3600,
            data:{
                _id: user.id,
                username: user.username,
                email: user.email
            }
        },
        keys.JWT_SERET_KEY);
        return token;
    }

}