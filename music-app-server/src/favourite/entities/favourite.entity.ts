// src/favorite/favorite.entity.ts
import { Song } from '@/song/entities/song.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  userId: string;

  @Column({ type: 'bigint' })
  songId: number;

  @ManyToOne(() => Song, (song) => song.id)
  @JoinColumn({ name: 'songId' }) // This links songId as the foreign key to Song.id
  song: Song;
}
