import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  app.enableCors({
    origin: ["http://localhost:5173", "thinknote.0xbuilder.in"],
    credentials: true
  });
  app.setGlobalPrefix("api")
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
