import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { USER_ID_HEADER } from '@/globals';

@Controller('favourites')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Post(':id')
  markFavourite(
    @Headers(USER_ID_HEADER) userId: string,
    @Param('id') songId: string,
  ) {
    if (!userId || !songId)
      throw new BadRequestException('userId or songId not available');

    return this.favouriteService.markFav(userId, songId);
  }

  @Delete(':id')
  removeFavourite(
    @Headers(USER_ID_HEADER) userId: string,
    @Param('id') songId: string,
  ) {
    return this.favouriteService.removeFav(userId, songId);
  }

  @Get()
  findAll(@Headers(USER_ID_HEADER) userId: string) {
    return this.favouriteService.findAllFavs(userId);
  }
}
