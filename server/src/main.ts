import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module: any; // new !



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.setGlobalPrefix('api');
  await app.listen(3000);

  if (module.hot) { // new !
    module.hot.accept(); // new !
    module.hot.dispose(() => app.close()); // new !
  } // new !

  
}
bootstrap();
