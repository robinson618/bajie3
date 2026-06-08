import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty() @IsString() @IsNotEmpty() slug: string;
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsNumber() @IsOptional() showBanner?: number;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}

export class UpdatePageDto {
  @ApiProperty() @IsString() @IsOptional() slug?: string;
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() content?: string;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsNumber() @IsOptional() showBanner?: number;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}

export class CreatePageBannerDto {
  @ApiProperty() @IsString() @IsNotEmpty() pageSlug: string;
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsOptional() subtitle?: string;
  @ApiProperty() @IsString() @IsOptional() image?: string;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}

export class UpdatePageBannerDto {
  @ApiProperty() @IsString() @IsOptional() pageSlug?: string;
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() subtitle?: string;
  @ApiProperty() @IsString() @IsOptional() image?: string;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}

export class CreatePageSeoDto {
  @ApiProperty() @IsString() @IsNotEmpty() pageSlug: string;
  @ApiProperty() @IsString() @IsOptional() metaTitle?: string;
  @ApiProperty() @IsString() @IsOptional() metaDescription?: string;
  @ApiProperty() @IsString() @IsOptional() metaKeywords?: string;
  @ApiProperty() @IsString() @IsOptional() ogTitle?: string;
  @ApiProperty() @IsString() @IsOptional() ogDescription?: string;
  @ApiProperty() @IsString() @IsOptional() ogImage?: string;
}

export class UpdatePageSeoDto {
  @ApiProperty() @IsString() @IsOptional() pageSlug?: string;
  @ApiProperty() @IsString() @IsOptional() metaTitle?: string;
  @ApiProperty() @IsString() @IsOptional() metaDescription?: string;
  @ApiProperty() @IsString() @IsOptional() metaKeywords?: string;
  @ApiProperty() @IsString() @IsOptional() ogTitle?: string;
  @ApiProperty() @IsString() @IsOptional() ogDescription?: string;
  @ApiProperty() @IsString() @IsOptional() ogImage?: string;
}
