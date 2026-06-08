import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CapabilityDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
}

export class CreateAppDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsOptional() version?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() introduction?: string;
  @ApiProperty() @IsString() @IsOptional() techStack?: string;
  @ApiProperty() @IsString() @IsOptional() githubUrl?: string;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsString() @IsOptional() video?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
  @ApiProperty() @IsArray() @ValidateNested({ each: true }) @Type(() => CapabilityDto) @IsOptional() capabilities?: CapabilityDto[];
}

export class UpdateAppDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() version?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() introduction?: string;
  @ApiProperty() @IsString() @IsOptional() techStack?: string;
  @ApiProperty() @IsString() @IsOptional() githubUrl?: string;
  @ApiProperty() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsString() @IsOptional() video?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
  @ApiProperty() @IsArray() @ValidateNested({ each: true }) @Type(() => CapabilityDto) @IsOptional() capabilities?: CapabilityDto[];
}
