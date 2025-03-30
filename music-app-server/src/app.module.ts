import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { FavouriteModule } from './favourite/favourite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song/entities/song.entity';
import { Favorite } from './favourite/entities/favourite.entity';
import {
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USERNAME,
} from './globals';
import { readFileSync } from 'fs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response.interceptor';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost', // Your PostgreSQL host
    //   port: 5432, // Your PostgreSQL port
    //   username: 'admin', // PostgreSQL username
    //   password: 'admin', // PostgreSQL password
    //   database: 'music', // Your PostgreSQL database name
    //   entities: [Song, Favorite], // Add your entities here
    //   synchronize: true, // Syncs the database schema with the entity definitions (only in development)
    // }),

    TypeOrmModule.forRoot({
      // url: POSTGRES_URL,
      type: 'postgres',
      username: PG_USERNAME,
      password: PG_PASSWORD,
      host: PG_HOST,
      port: Number(PG_PORT),
      database: PG_DATABASE,
      ssl: {
        rejectUnauthorized: true,
        ca: readFileSync('./ca.pem').toString(),
      },
      entities: [Song, Favorite],
      synchronize: true,
      // logging: true,
    }),
    SongModule,
    FavouriteModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
