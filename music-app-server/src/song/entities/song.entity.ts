// src/song/song.entity.ts
import { Favorite } from '@/favourite/entities/favourite.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 30 })
  artist: string;

  @Column({ type: 'smallint' })
  length: number;

  @OneToMany(() => Favorite, (favorite) => favorite.song) // OneToMany relationship
  favorites: Favorite[];
}
