import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseMessageRequestDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  attachments?: string[];
}
