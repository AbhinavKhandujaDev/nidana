import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ILike, Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '@/favourite/entities/favourite.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  createMany(songs: CreateSongDto[]) {
    const songEntities = this.songRepository.create(songs);
    return this.songRepository.save(songEntities);
  }

  async findAll(
    userId: string,
    query?: string,
    skip: number = 0,
    take: number = 10,
  ) {
    const builder = this.songRepository
      .createQueryBuilder('song')
      .select(['song.id', 'song.title', 'song.artist', 'song.length']);
    if (query?.length) builder.where([{ title: ILike(`%${query}%`) }]);

    const songs = await builder
      .offset(skip)
      .limit(take)
      .leftJoin(
        Favorite,
        'favorite',
        '"favorite"."songId" = song.id AND "favorite"."userId" = :userId',
        { userId },
      )
      .addSelect('favorite.id', 'favourite')
      .getRawMany();

    return songs.map(
      ({ song_id, song_title, song_artist, song_length, favourite }) => ({
        id: song_id,
        title: song_title,
        artist: song_artist,
        length: song_length,
        favourite,
      }),
    );
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} song`;
  // }

  // update(id: number, updateSongDto: UpdateSongDto) {
  //   return `This action updates a #${id} song`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} song`;
  // }
}
