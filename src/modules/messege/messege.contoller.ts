// import {
//   Body,
//   Controller,
//   Post,
//   UploadedFiles,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
//
// import { CurrentUser } from '../auth/decorators/current-user.decorator';
// import { IUserData } from '../auth/interfaces/user-data.interface';
// import { CreateMessageRequestDto } from './models/dto/request/create-message.request.dto';
// import { IFileData } from './models/interfaces/file-data.interface';
// import { MessagesService } from './services/messege.service';
//
// @ApiTags('Message')
// @Controller('messages')
// export class MessageController {
//   constructor(private readonly messagesService: MessagesService) {}
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Create message' })
//   @Post()
//   @UseInterceptors(FilesInterceptor('attachments'))
//   public async create(
//     @CurrentUser() userData: IUserData,
//     @Body() createMessageDto: CreateMessageRequestDto,
//     @UploadedFiles() files: Express.Multer.IFileData[],
//   ) {
//     return await this.messagesService.create(userData, createMessageDto, files);
//   }
//   //
//   // @Get(':recipientId')
//   // async findAll(@Request() req, @Param('recipientId') recipientId: string) {
//   //   return await this.messagesService.findAll(req.user.id, +recipientId);
//   // }
//   //
//   // @Put(':id')
//   // async update(
//   //   @Param('id') id: string,
//   //   @Body() updateMessageDto: UpdateMessageDto,
//   // ) {
//   //   return await this.messagesService.update(+id, updateMessageDto);
//   // }
//   //
//   // @Delete(':id')
//   // async remove(@Param('id') id: string) {
//   //   return await this.messagesService.remove(+id);
//   // }
// }
