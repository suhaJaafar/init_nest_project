import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthType } from '@app/enums';
import { Auth } from '@app/decorators';

@Controller()
@Auth(AuthType.None)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return { message: 'Welcome to Tawasl API' };
  }
}
