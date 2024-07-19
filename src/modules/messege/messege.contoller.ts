import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { photoConfig } from '../../constants/photo-config';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateMessageRequestDto } from './models/dto/request/create-message.request.dto';
import { MessageListRequestDto } from './models/dto/request/message-list.request.dto';
import { UpdateMessageDto } from './models/dto/request/update-message.request.dto';
import { MessageListResponseDto } from './models/dto/response/message-list.resopnse.dto';
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all messages' })
  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: MessageListRequestDto,
  ): Promise<MessageListResponseDto> {
    return await this.messagesService.findAll(userData, query);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update message' })
  @Put('/:message_id')
  @UseInterceptors(
    FilesInterceptor('attachments', 10, {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: photoConfig.MAX_SIZE,
      },
    }),
  )
  public async update(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateMessageDto,
    @Param('message_id', ParseUUIDPipe) message_id: string,
    @UploadedFiles() attachments: Express.Multer.File[],
  ): Promise<ResponseMessageDto> {
    return await this.messagesService.update(
      userData,
      message_id,
      dto,
      attachments,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete message' })
  @Delete('/:message_id')
  public async delete(
    @CurrentUser() userData: IUserData,
    @Param('message_id', ParseUUIDPipe) message_id: string,
  ): Promise<void> {
    return await this.messagesService.deleteMessage(userData, message_id);
  }
}
