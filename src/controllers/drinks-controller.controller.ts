import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
const axios =require('axios');
// import {inject} from '@loopback/core';


export class DrinksControllerController {
  constructor() {}
  @get('/drinks/random')
  @response(200,{
    description: 'Array of Categories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array'
        },
      },
    },
  })
  async getDrinks():Promise<object>{
    const consult = [ `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
                      `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
                      `https://www.thecocktaildb.com/api/json/v1/1/random.php`];

    const promise = consult.map(el => axios.get(el));
    
    const result = await Promise.all(promise);
    

    return result.map(el => el.data.drinks[0])
  }

}
