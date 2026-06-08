import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() description: string;
  @ApiProperty() @IsString() @IsNotEmpty() type: string;
  @ApiProperty() @IsString() @IsOptional() status?: string;
  @ApiProperty() @IsString() @IsNotEmpty() date: string;
  @ApiProperty() @IsString() @IsOptional() location?: string;
  @ApiProperty() @IsString() @IsOptional() image?: string;
  @ApiProperty() @IsNumber() @IsOptional() participants?: number;
  @ApiProperty() @IsNumber() @IsOptional() maxParticipants?: number;
}

export class UpdateActivityDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() type?: string;
  @ApiProperty() @IsString() @IsOptional() status?: string;
  @ApiProperty() @IsString() @IsOptional() date?: string;
  @ApiProperty() @IsString() @IsOptional() location?: string;
  @ApiProperty() @IsString() @IsOptional() image?: string;
  @ApiProperty() @IsNumber() @IsOptional() participants?: number;
  @ApiProperty() @IsNumber() @IsOptional() maxParticipants?: number;
}
