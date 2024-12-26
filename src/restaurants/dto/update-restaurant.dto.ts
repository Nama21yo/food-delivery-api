import {
  IsEmail,
  IsEnum,
  IsOptional,
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
export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEmail({}, { message: 'Please enter correct Email Address' })
  @IsOptional()
  readonly email: string;

  @IsPhoneNumber('US')
  @IsOptional()
  readonly phoneNo: number;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Category, { message: 'Please enter correct Category' })
  @IsOptional()
  readonly category: Category;
}
