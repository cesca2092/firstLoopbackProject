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


export class CategoryControllerController {
  constructor() {}

  @get('/categories')
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
  async getCategories():Promise<object> {
    const consult = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    
    const result = consult.data.drinks;
    return result
  }
}
