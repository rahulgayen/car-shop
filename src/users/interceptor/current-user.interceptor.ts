import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    // const [request] = context.getArgs();
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    console.log('cur user interceptor');
    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}
