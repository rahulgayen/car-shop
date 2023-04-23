import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const [req, res, next] = context.getArgs();

    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(UserDto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
