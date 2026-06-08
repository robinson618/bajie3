import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
  @ApiProperty() @IsString() @IsOptional() summary?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsNumber() @IsOptional() categoryId?: number;
  @ApiProperty() @IsNumber() @IsOptional() subcategoryId?: number;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
}

export class UpdateDocumentDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() content?: string;
  @ApiProperty() @IsString() @IsOptional() summary?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsNumber() @IsOptional() categoryId?: number;
  @ApiProperty() @IsNumber() @IsOptional() subcategoryId?: number;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
}

export class CreateDocCategoryDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() icon?: string;
  @ApiProperty() @IsString() @IsOptional() content?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}

export class UpdateDocCategoryDto {
  @ApiProperty() @IsString() @IsOptional() name?: string;
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() icon?: string;
  @ApiProperty() @IsString() @IsOptional() content?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}

export class CreateDocSubcategoryDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() categoryId: number;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() content?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}

export class UpdateDocSubcategoryDto {
  @ApiProperty() @IsNumber() @IsOptional() categoryId?: number;
  @ApiProperty() @IsString() @IsOptional() name?: string;
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() content?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}
