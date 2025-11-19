import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch() // Captura todos los errores
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = 500;
    let message = 'Internal server error';

    // Manejo de errores de Prisma
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': // Violación de unicidad
          status = 400;
          const targets = Array.isArray(exception.meta?.target)
            ? exception.meta.target
            : [];
          message = `${targets.join(', ')} already exists`;
          break;
        default:
          message = exception.message;
      }
    }
    // Manejo de errores HTTP de NestJS
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message || JSON.stringify(res);
    }
    // Otros errores
    else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({ statusCode: status, message });
  }
}
