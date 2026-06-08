import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSiteConfigDto {
  @ApiProperty() @IsString() @IsNotEmpty() configKey: string;
  @ApiProperty() @IsString() @IsNotEmpty() configValue: string;
  @ApiProperty() @IsString() @IsOptional() configType?: string;
}
