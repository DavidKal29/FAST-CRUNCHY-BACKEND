import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido a la api de Fast & Crunchy, todo funciona a la perfección';
  }
}
