import { ResponseMessageDto } from './response-message.dto';

export class MessageListResponseDto {
  data: ResponseMessageDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
