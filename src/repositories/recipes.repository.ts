import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Recipes, RecipesRelations} from '../models';

export class RecipesRepository extends DefaultCrudRepository<
  Recipes,
  typeof Recipes.prototype.id,
  RecipesRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Recipes, dataSource);
  }
}
