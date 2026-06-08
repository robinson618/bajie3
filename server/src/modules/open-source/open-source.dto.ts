import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOpenSourceDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsOptional() version?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() pythonUrl?: string;
  @ApiProperty() @IsString() @IsOptional() cppUrl?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
}

export class UpdateOpenSourceDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() version?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() pythonUrl?: string;
  @ApiProperty() @IsString() @IsOptional() cppUrl?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
}

export class CreateOpenSourceCategoryDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}

export class UpdateOpenSourceCategoryDto {
  @ApiProperty() @IsString() @IsOptional() name?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}
