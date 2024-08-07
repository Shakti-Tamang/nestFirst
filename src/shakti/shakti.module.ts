import { Module } from '@nestjs/common';
import { ShaktiController } from './controllers/shakti/shakti.controller';

@Module({
  controllers: [ShaktiController]
})
export class ShaktiModule {}
