import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: () => void) {
    const { baseUrl, ip, method } = req;
    const userAgent = req.headers['user-agent'];
    const startAt = process.hrtime();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const dif = process.hrtime(startAt);
      const responseTime = dif[0] * 1e3 + dif[1] / 1e6;
      this.logger.log(
        `${method} ${baseUrl} - ${statusCode} ${userAgent} - ${contentLength} bytes - ${responseTime.toFixed(2)} ms [${ip}]`,
      );
    });
    next();
  }
}
