import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Category { // to define a set of constants
  FAST_FOOD = 'Fast Food',
  CAFE = 'CAFE',
  FINE_DINNIMG = 'Fine Dinning',
}

@Schema()
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  phoneNo: number;

  @Prop()
  address: string;

  @Prop()
  category: Category;

  @Prop()
  images?: Object[]; // it is optional
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
