import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntToStringInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        function convertBigInt(obj: any): any {
          if (obj === null || obj === undefined) return obj;
          if (typeof obj === 'bigint') {
            return obj.toString();
          }
          if (Array.isArray(obj)) {
            return obj.map(convertBigInt);
          }
          if (typeof obj === 'object') {
            for (const key in obj) {
              obj[key] = convertBigInt(obj[key]);
            }
            return obj;
          }
          return obj;
        }
        return convertBigInt(data);
      }),
    );
  }
}
