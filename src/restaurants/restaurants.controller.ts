import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(@Query() query: ExpressQuery): Promise<Restaurant[]> {
    return this.restaurantsService.findAll(query);
  }

  @Post()
  async createRestaurant(
    @Body()
    restaurant: CreateRestaurantDto, // update the import to DTO and it will check whether the data is correct
  ): Promise<Restaurant> {
    try {
      return await this.restaurantsService.create(restaurant);
    } catch (error) {
      // Throw an HTTP exception for better error reporting
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to create restaurant',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getRestaurantByID(
    @Param('id')
    id: string,
  ): Promise<Restaurant> {
    return this.restaurantsService.findById(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id')
    id: string,
    @Body()
    restaurant,
  ): Promise<Restaurant> {
    await this.restaurantsService.findById(id);
    return this.restaurantsService.updateById(id, restaurant);
  }

  @Delete(':id')
  async deleteRestaurant(
    @Param('id')
    id: string,
  ): Promise<{ deleted: Boolean }> {
    const restaurant = this.restaurantsService.deleteById(id);

    if (restaurant) {
      return {
        deleted: true,
      };
    }
  }
}
