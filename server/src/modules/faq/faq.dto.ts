import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty() @IsString() @IsNotEmpty() question: string;
  @ApiProperty() @IsString() @IsNotEmpty() answer: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}

export class UpdateFaqDto {
  @ApiProperty() @IsString() @IsOptional() question?: string;
  @ApiProperty() @IsString() @IsOptional() answer?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}

export class CreateFaqCategoryDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}

export class UpdateFaqCategoryDto {
  @ApiProperty() @IsString() @IsOptional() name?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}
