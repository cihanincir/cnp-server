import { Module } from '@nestjs/common';
import { SocketService } from './Socket';
import { UserModule } from './Routes/User/User.module';
import { ChatModule } from './Routes/Chat/Chat.module';

@Module({
  imports: [UserModule, ChatModule],
  providers: [SocketService],
})
export class AppModule { }
