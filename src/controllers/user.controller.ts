// Uncomment these imports to begin using these cool features!

import { post, requestBody } from "@loopback/openapi-v3";
import { repository } from "@loopback/repository";
import { HttpErrors } from "@loopback/rest";
import { UsersRepository } from "../repositories";
import { AuthService } from "../services/auth.service";

// import {inject} from '@loopback/core';

class Credentials{
  username: string;
  password: string;
}
export class UserController {

  authService: AuthService;

  constructor(
    @repository(UsersRepository)
    public userRepository: UsersRepository
  ) {
    this.authService = new AuthService(userRepository);
  }

  @post('/login',{
    responses:{
      '200':{
        description: 'Login for Users'
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials
    ): Promise<object> {
      const user = await this.authService.Identify(credentials.username, credentials.password);

      if(user){
        const token = await this.authService.GenerateToken(user);
        return {
          data:{
            name: user.name,
            email: user.email,
            username: user.username
          },
          token
        }
      } else {
        throw new HttpErrors[401]('Usuario o Password invalido');
      }

  }



}


