import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncubateDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() teamName: string;
  @ApiProperty() @IsString() @IsNotEmpty() description: string;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsNumber() @IsOptional() progress?: number;
  @ApiProperty() @IsString() @IsOptional() status?: string;
}

export class UpdateIncubateDto {
  @ApiProperty() @IsString() @IsOptional() name?: string;
  @ApiProperty() @IsString() @IsOptional() teamName?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsNumber() @IsOptional() progress?: number;
  @ApiProperty() @IsString() @IsOptional() status?: string;
}
