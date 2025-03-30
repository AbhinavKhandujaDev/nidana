import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  artist: string;

  @IsNumber()
  @IsNotEmpty()
  length: number;
}
