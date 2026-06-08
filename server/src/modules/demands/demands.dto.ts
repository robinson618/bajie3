import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDemandDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() type: string;
  @ApiProperty() @IsString() @IsNotEmpty() description: string;
  @ApiProperty() @IsString() @IsNotEmpty() contactName: string;
  @ApiProperty() @IsString() @IsNotEmpty() contactPhone: string;
  @ApiProperty() @IsString() @IsOptional() contactEmail?: string;
}

export class UpdateDemandDto {
  @ApiProperty() @IsString() @IsOptional() title?: string;
  @ApiProperty() @IsString() @IsOptional() type?: string;
  @ApiProperty() @IsString() @IsOptional() description?: string;
  @ApiProperty() @IsString() @IsOptional() contactName?: string;
  @ApiProperty() @IsString() @IsOptional() contactPhone?: string;
  @ApiProperty() @IsString() @IsOptional() contactEmail?: string;
  @ApiProperty() @IsString() @IsOptional() status?: string;
}
