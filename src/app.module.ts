import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PasswordController } from './password/password.controller';
import { PasswordService } from './password/password.service';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [AuthModule, PasswordModule],
  controllers: [AppController, AuthController, PasswordController],
  providers: [AppService, AuthService, PasswordService],
})
export class AppModule {}
