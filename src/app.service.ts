import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'get-hello',
  })
  getHello(): string {
    this.logger.info('Hello dear! ( test )');
    return 'Server successfully is run!';
  }
}
