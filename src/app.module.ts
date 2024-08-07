import { Module } from '@nestjs/common';
import { ShaktiModule } from './shakti/shakti.module';
import { TypeOrmModule } from '@nestjs/typeorm';



// npm install --save @nestjs/typeorm typeorm pg post grace download:

// Typescipt is superset of javascript it means it include all feeaturs of java including additional features

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Shakti',
      database: 'shaktiAmu',
      synchronize: true,
    }),
    
    ShaktiModule],
  controllers: [],
  providers: [],
})
export class AppModule {


}
