import { Module } from '@nestjs/common';
import { ShaktiController } from './controllers/shakti/shakti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shakti } from './Entity/shakti.entity';
import { jina } from './Entity/ram.entity';
import { shaktiService } from './services/shakti/shakti.service';





// set for entity  rfepository pattern 
@Module({
    imports:[TypeOrmModule.forFeature([shakti,jina])],
  controllers: [ShaktiController],

//   managing services:
  providers:[shaktiService],
})
export class ShaktiModule {}
