import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsOptional() subtitle?: string;
  @ApiProperty() @IsString() @IsOptional() image?: string;
  @ApiProperty() @IsString() @IsOptional() link?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}

export class UpdateBannerDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() subtitle?: string;
  @ApiProperty() @IsString() @IsOptional() image?: string;
  @ApiProperty() @IsString() @IsOptional() link?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}
