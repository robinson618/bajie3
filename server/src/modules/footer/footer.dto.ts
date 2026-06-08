import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFooterItemDto {
  @ApiProperty() @IsString() @IsNotEmpty() sectionTitle: string;
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsOptional() url?: string;
  @ApiProperty() @IsString() @IsOptional() icon?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}

export class UpdateFooterItemDto {
  @ApiProperty() @IsString() @IsOptional() sectionTitle?: string;
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() url?: string;
  @ApiProperty() @IsString() @IsOptional() icon?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}
