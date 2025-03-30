import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favourite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async markFav(userId: string, songId: string) {
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { userId, songId: Number(songId) },
    });

    if (existingFavorite) return existingFavorite;

    const favEntity = this.favoriteRepository.create({
      userId,
      songId: Number(songId),
    });

    return this.favoriteRepository.save(favEntity);
  }

  findAllFavs(userId: string) {
    return this.favoriteRepository.findBy({ userId });
  }

  findOneFav(userId: string, songId: string) {
    return this.favoriteRepository.findOneBy({
      userId,
      songId: Number(songId),
    });
  }

  removeFav(userId: string, songId: string) {
    return this.favoriteRepository.delete({ userId, songId: Number(songId) });
  }
}
