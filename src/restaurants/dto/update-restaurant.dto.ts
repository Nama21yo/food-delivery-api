import { Category } from '../schemas/restaurant.schema';

/*
But first (if you use TypeScript), we need to determine the DTO (Data Transfer Object) schema. 
A DTO is an object that defines how the data will be sent over the network. We could determine 
the DTO schema by using TypeScript interfaces, 
or by simple classes.
*/
export class UpdateRestaurantDto {
  readonly name: string;
  readonly description: string;
  readonly email: string;
  readonly phoneNo: number;
  readonly address: string;
  readonly category: Category;
}
