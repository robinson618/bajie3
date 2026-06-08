import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNavMenuDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() url: string;
  @ApiProperty() @IsString() @IsOptional() icon?: string;
  @ApiProperty() @IsNumber() @IsOptional() parentId?: number;
  @ApiProperty() @IsString() @IsOptional() target?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}

export class UpdateNavMenuDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() url?: string;
  @ApiProperty() @IsString() @IsOptional() icon?: string;
  @ApiProperty() @IsNumber() @IsOptional() parentId?: number;
  @ApiProperty() @IsString() @IsOptional() target?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
  @ApiProperty() @IsNumber() @IsOptional() isActive?: number;
}
