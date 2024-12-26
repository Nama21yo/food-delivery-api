import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/restaurant.schema';

/*
But first (if you use TypeScript), we need to determine the DTO (Data Transfer Object) schema. 
A DTO is an object that defines how the data will be sent over the network. We could determine 
the DTO schema by using TypeScript interfaces, 
or by simple classes.
*/
export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct Email Address' })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber('US')
  readonly phoneNo: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct Category' })
  readonly category: Category;
}
