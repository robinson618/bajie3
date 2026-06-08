import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscussionDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsNumber() @IsOptional() userId?: number;
  @ApiProperty() @IsString() @IsOptional() userName?: string;
  @ApiProperty() @IsString() @IsOptional() userAvatar?: string;
  @ApiProperty() @IsNumber() @IsOptional() userLevel?: number;
}

export class UpdateDiscussionDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() content?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPinned?: number;
}

export class CreateCommentDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() discussionId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() userId: number;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
}
