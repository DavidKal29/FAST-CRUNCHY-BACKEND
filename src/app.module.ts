import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PasswordController } from './password/password.controller';
import { PasswordService } from './password/password.service';
import { PasswordModule } from './password/password.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, PasswordModule, ProfileModule, ProductsModule],
  controllers: [AppController, AuthController, PasswordController, ProfileController, ProductsController],
  providers: [AppService, AuthService, PasswordService, ProfileService, ProductsService],
})
export class AppModule {}
