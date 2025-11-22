import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = 400;
          const targets = Array.isArray(exception.meta?.target)
            ? exception.meta.target
            : [];
          message = `${targets.join(', ')} already exists`;
          break;

        default:
          message = exception.message;
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : (res as any).message || JSON.stringify(res);
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({ statusCode: status, message });
  }
}
