import { Module } from '@nestjs/common';
import { ShaktiModule } from './shakti/shakti.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import  { join } from 'path';




// npm install --save @nestjs/typeorm typeorm pg post grace download:

// Typescipt is superset of javascript it means it include all feeaturs of java including additional features

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),


        // for all entity   it will san all entity
        entities: [join(__dirname, '**/*.entity.{js,ts}')], // Add your entity classes here
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ShaktiModule],
  controllers: [],
  providers: [],
})
export class AppModule {


}
