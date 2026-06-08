import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() featureIntro?: string;
  @ApiProperty() @IsString() @IsOptional() techSpecs?: string;
  @ApiProperty() @IsString() @IsOptional() supportedDevices?: string;
  @ApiProperty() @IsString() @IsOptional() documentUrl?: string;
  @ApiProperty() @IsString() @IsOptional() downloadUrl?: string;
  @ApiProperty() @IsString() @IsOptional() author?: string;
  @ApiProperty() @IsString() @IsOptional() version?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsString() @IsOptional() skillCategory?: string;
  @ApiProperty() @IsString() @IsOptional() icon?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
}

export class UpdateSkillDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() featureIntro?: string;
  @ApiProperty() @IsString() @IsOptional() techSpecs?: string;
  @ApiProperty() @IsString() @IsOptional() supportedDevices?: string;
  @ApiProperty() @IsString() @IsOptional() documentUrl?: string;
  @ApiProperty() @IsString() @IsOptional() downloadUrl?: string;
  @ApiProperty() @IsString() @IsOptional() author?: string;
  @ApiProperty() @IsString() @IsOptional() version?: string;
  @ApiProperty() @IsString() @IsOptional() category?: string;
  @ApiProperty() @IsString() @IsOptional() skillCategory?: string;
  @ApiProperty() @IsString() @IsOptional() icon?: string;
  @ApiProperty() @IsNumber() @IsOptional() isPublished?: number;
}

export class CreateSkillCategoryDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}

export class UpdateSkillCategoryDto {
  @ApiProperty() @IsString() @IsOptional() name?: string;
  @ApiProperty() @IsNumber() @IsOptional() sortOrder?: number;
}
