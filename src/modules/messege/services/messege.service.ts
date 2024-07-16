import { Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { MessageRepository } from '../../repository/services/message.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateMessageRequestDto } from '../models/dto/request/create-message.request.dto';
import { ResponseMessageDto } from '../models/dto/response/response-message.dto';
import { MessageMapper } from './message.mapper';
import { S3Service } from './s3.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly messageRepository: MessageRepository,
    private readonly s3Service: S3Service,
  ) {}

  public async create(
    userData: IUserData,
    recipient_id: string,
    createMessageDto: CreateMessageRequestDto,
    attachments: Express.Multer.File[],
  ): Promise<ResponseMessageDto> {
    const sender = await this.userRepository.findByIdOrThrow(userData.userId);
    const recipient = await this.userRepository.findByIdOrThrow(recipient_id);
    const attachmentUrls = await Promise.all(
      attachments.map((file) =>
        this.s3Service.uploadFileToS3(file, userData.userId),
      ),
    );

    const message = this.messageRepository.create({
      sender_id: sender.id,
      recipient_id: recipient.id,
      text: createMessageDto.text,
      attachments: attachmentUrls,
    });

    await this.messageRepository.save(message);
    return MessageMapper.toResponseDto(message);
  }
}
