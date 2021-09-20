import {Entity, model, property} from '@loopback/repository';

@model()
export class Recipes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  img: string;




  constructor(data?: Partial<Recipes>) {
    super(data);
  }
}

export interface RecipesRelations {
  // describe navigational properties here
}

export type RecipesWithRelations = Recipes & RecipesRelations;
