import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
  @ApiProperty() @IsString() @IsOptional() summary?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsString() @IsOptional() source?: string;
  @ApiProperty() @IsString() @IsOptional() author?: string;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
}

export class UpdateNewsDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() content?: string;
  @ApiProperty() @IsString() @IsOptional() summary?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsString() @IsOptional() source?: string;
  @ApiProperty() @IsString() @IsOptional() author?: string;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
}
