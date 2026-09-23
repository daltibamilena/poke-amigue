import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: string; service: string } {
    return {
      status: 'ok',
      service: 'api',
    };
  }

  getWelcome(): { message: string } {
    return {
      message: 'Welcome from the NestJS API',
    };
  }
}
