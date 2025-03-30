// common/interceptors/response.interceptor.ts

import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from './response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Wrap response in the global structure once
        const response = context.switchToHttp().getResponse();
        const newData = new ResponseDto(false, 'Request was successful', data);

        // Modify the response object only once
        response.data = {
          error: newData.error,
          message: newData.message,
          data: newData.data,
        };

        // Return the transformed response, make sure it's just one emission
        return response.data;
      }),
    );
  }
}
