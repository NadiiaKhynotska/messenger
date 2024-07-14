import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class BaseMessageRequestDto {
  @IsUUID()
  @IsNotEmpty()
  sender_id: string;

  @IsUUID()
  @IsNotEmpty()
  recipient_id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  attachments?: string[];
}
