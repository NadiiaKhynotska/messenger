import { ConflictException, Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { MessageRepository } from '../../repository/services/message.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { EventsGateway } from '../events/events.gateway';
import { CreateMessageRequestDto } from '../models/dto/request/create-message.request.dto';
import { UpdateMessageDto } from '../models/dto/request/update-message.request.dto';
import { ResponseMessageDto } from '../models/dto/response/response-message.dto';
import { MessageMapper } from './message.mapper';
import { S3Service } from './s3.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly messageRepository: MessageRepository,
    private readonly s3Service: S3Service,
    private readonly eventsGateway: EventsGateway,
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
    const responseMessage = MessageMapper.toResponseDto(message);

    this.eventsGateway.sendMessageToUser(recipient_id, responseMessage);
    return responseMessage;
  }

  public async update(
    userData: IUserData,
    message_id: string,
    dto: UpdateMessageDto,
    attachments: Express.Multer.File[],
  ): Promise<ResponseMessageDto> {
    const message = await this.messageRepository.findByIdOrThrow(message_id);
    if (message.sender_id !== userData.userId) {
      throw new ConflictException('You are not aloud to update this message');
    }
    let updatedAttachmentUrls = message.attachments;
    if (attachments && attachments.length > 0) {
      if (message.attachments && message.attachments.length > 0) {
        await Promise.all(
          message.attachments.map((attachment) =>
            this.s3Service.deleteFileFromS3(attachment),
          ),
        );
        updatedAttachmentUrls = await Promise.all(
          attachments.map((file) =>
            this.s3Service.uploadFileToS3(file, userData.userId),
          ),
        );
      }
    }

    await this.messageRepository.update(message_id, {
      text: dto.text,
      attachments: updatedAttachmentUrls,
    });
    const updatedMessage = await this.messageRepository.findOne({
      where: { id: message_id },
    });
    return MessageMapper.toResponseDto(updatedMessage);
  }

  public async deleteMessage(
    userData: IUserData,
    message_id: string,
  ): Promise<void> {
    const message = await this.messageRepository.findByIdOrThrow(message_id);

    if (message.sender_id !== userData.userId) {
      throw new ConflictException('You are not allowed to delete this message');
    }

    if (message.attachments && message.attachments.length > 0) {
      await Promise.all(
        message.attachments.map((attachment) =>
          this.s3Service.deleteFileFromS3(attachment),
        ),
      );
    }

    await this.messageRepository.delete(message_id);
  }
}
