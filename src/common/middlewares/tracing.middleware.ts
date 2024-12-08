import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TracingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TracingMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();
    
    res.on('finish', () => {
      const endTime = Date.now();
      const elapsedTime = endTime - now;
      this.logger.debug(
        `[${req.method}] ${req.originalUrl} - ${elapsedTime}ms`,
      );
    });

    next();
  }
}
