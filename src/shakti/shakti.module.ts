import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ShaktiController } from './controllers/shakti/shakti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shakti } from './Entity/shakti.entity';
import { jina } from './Entity/ram.entity';
import { ShaktiService } from './services/shakti/shakti.service';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { JinaRepository } from './Repository/shakti.repo';
import { ShaktiRepository } from './Repository/my.amurepo';







// set for entity  rfepository pattern 
@Module({
    imports:[TypeOrmModule.forFeature([jina,shakti])],
  controllers: [ShaktiController],

//   managing services:
providers: [
  {
      provide: 'ShaktiServiceInterface',
      useClass: ShaktiService,
  },
  JinaRepository,
  ShaktiRepository,
],
  
})

// configure middleware  middle ware will be called before any rotes runs
export class ShaktiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(ExampleMiddleware).forRoutes({
              path: 'shakti',
              method: RequestMethod.GET,

          },
          {
            path: 'shakti/update',
            method: RequestMethod.PATCH,

        },
        {
          path: 'shakti/get/:id',
          method: RequestMethod.GET,

      },
      {
        path: 'shakti/delete/:id',
        method: RequestMethod.DELETE,

    });
  }
}


