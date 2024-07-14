// import { Injectable } from '@nestjs/common';
// import { S3 } from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';
//
// import { MessageRepository } from '../../repository/services/message.repository';
// import { UserRepository } from '../../repository/services/user.repository';
// import { CreateMessageRequestDto } from '../models/dto/request/create-message.request.dto';
// import { IUserData } from '../../auth/interfaces/user-data.interface';
//
// @Injectable()
// export class MessagesService {
//   constructor(
//     private readonly userRepository: UserRepository,
//     private readonly messageRepository: MessageRepository,
//   ) {}
//
//   async create(
//     userData: IUserData,
//     createMessageDto: CreateMessageRequestDto,
//     files: Express.Multer.File[],
//   ) {
//     const sender = await this.userRepository.findOne(userData.userId);
//     const recipient = await this.userRepository.findOne(
//       createMessageDto.recipient_id,
//     );
//     const attachments = await this.uploadFiles(files);
//
//     const message = this.messageRepository.create({
//       sender,
//       recipient,
//       text: createMessageDto.text,
//       attachments,
//     });
//
//     return await this.messageRepository.save(message);
//   }
//   //
//   // async findAll(senderId: number, recipientId: number) {
//   //   return await this.messageRepository.find({
//   //     where: [
//   //       { sender: { id: senderId }, recipient: { id: recipientId } },
//   //       { sender: { id: recipientId }, recipient: { id: senderId } },
//   //     ],
//   //     relations: ['sender', 'recipient'],
//   //   });
//   // }
//   //
//   // async update(id: number, updateMessageDto: UpdateMessageDto) {
//   //   await this.messageRepository.update(id, updateMessageDto);
//   //   return await this.messageRepository.findOne(id);
//   // }
//   //
//   // async remove(id: number) {
//   //   await this.messageRepository.delete(id);
//   // }
//   //
//   // private async uploadFiles(files: Express.Multer.File[]) {
//   //   const s3 = new S3();
//   //   const uploads = files.map(async (file) => {
//   //     const uploadParams = {
//   //       Bucket: process.env.AWS_S3_BUCKET,
//   //       Key: `${uuidv4()}-${file.originalname}`,
//   //       Body: file.buffer,
//   //       ContentType: file.mimetype,
//   //     };
//   //
//   //     const { Location } = await s3.upload(uploadParams).promise();
//   //     return Location;
//   //   });
//   //
//   //   return await Promise.all(uploads);
//   // }
// }
