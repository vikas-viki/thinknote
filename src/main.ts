import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
