import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseMessageRequestDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString({ each: true })
  attachments?: string[];
}
