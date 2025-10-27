import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';

@Module({})
export class PasswordModule {
    controllers = [PasswordController]

    services = [PasswordService]
}
