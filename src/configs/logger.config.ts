import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const env = process.env.NODE_ENV;
const logDir = __dirname + '/../../logs'; // log 파일을 관리할 폴더

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// rfc5424를 따르는 winston만의 log level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env ? 'silly' : 'http',
      // production 환경이라면 http, 개발환경이라면 모든 단계를 로그
      format:
        env === 'prod'
          ? // production 환경은 자원을 아끼기 위해 simple 포맷 사용
            winston.format.combine(
              winston.format.colorize({ all: false }),
              winston.format.timestamp(),
              utilities.format.nestLike('Prod', {
                prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
              }),
            )
          : winston.format.combine(
              winston.format.colorize({ all: true }),
              winston.format.timestamp(),
              utilities.format.nestLike('Dev', {
                prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
              }),
            ),
    }),

    // info, warn, error 로그는 파일로 관리
  ],
});
