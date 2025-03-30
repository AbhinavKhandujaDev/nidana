import { Controller, Get, Post, Body, Query, Headers } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { USER_ID_HEADER } from '@/globals';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  findAll(
    @Headers(USER_ID_HEADER) userId: string,
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
    @Query('title') title: string,
  ) {
    return this.songService.findAll(userId, title, skip, take);
  }

  @Post()
  create(@Body() songs: CreateSongDto[]) {
    return this.songService.createMany(songs);
  }

  // @Get()
  // findAll() {
  //   return this.songService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.songService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
  //   return this.songService.update(+id, updateSongDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.songService.remove(+id);
  // }
}
