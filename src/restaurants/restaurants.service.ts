import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  // Get All Restaurants => GET /restaurants
  async findAll(query: Query): Promise<Restaurant[]> {
    // implementing Pagination
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    // implemeting the searching
    const keyword = query.keyword
      ? {
          name: {
            // use regex
            $regex: query.keyword,
            $options: 'i', //case insensetive
          },
        }
      : {};
    const restaurants = await this.restaurantModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return restaurants;
  }

  // create new restaurant => POST /restaurants

  async create(restaurant: Restaurant): Promise<Restaurant> {
    try {
      const res = await this.restaurantModel.create(restaurant); // Pass the data to create()
      return res;
    } catch (error) {
      throw new Error('Failed to create restaurant: ' + error.message);
    }
  }

  // Get a restaurant by ID => GET /restaurants/:id
  async findById(id: string): Promise<Restaurant> {
    const isValid = mongoose.isValidObjectId(id);

    if (!isValid) {
      throw new BadRequestException(
        'Wrong Mongoose ID Error. Please Enter Correct Id.',
      );
    }
    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant Not found');
    }

    return restaurant;
  }

  // Update a restaurant by Id => PUT /restaurants/:id
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a restaurant by Id => DELETE /restaurants/:id
  async deleteById(id: string): Promise<Restaurant> {
    return await this.restaurantModel.findByIdAndDelete(id);
  }
}
