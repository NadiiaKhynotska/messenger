import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { photoConfig } from '../../constants/photo-config';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateMessageRequestDto } from './models/dto/request/create-message.request.dto';
import { ResponseMessageDto } from './models/dto/response/response-message.dto';
import { MessagesService } from './services/messege.service';
import { imageFileFilter } from './utils/file.utils';

@ApiTags('Message')
@Controller('messages')
export class MessageController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create message' })
  @Post('/:recipient_id')
  @UseInterceptors(
    FilesInterceptor('attachments', 10, {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: photoConfig.MAX_SIZE,
      },
    }),
  )
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() createMessageDto: CreateMessageRequestDto,
    @Param('recipient_id', ParseUUIDPipe) recipient_id: string,
    @UploadedFiles() attachments: Express.Multer.File[],
  ): Promise<ResponseMessageDto> {
    return await this.messagesService.create(
      userData,
      recipient_id,
      createMessageDto,
      attachments,
    );
  }
}
