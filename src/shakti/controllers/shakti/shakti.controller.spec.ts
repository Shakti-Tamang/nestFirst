import { Test, TestingModule } from '@nestjs/testing';
import { ShaktiController } from './shakti.controller';



describe('ShaktiController', () => {
  let controller: ShaktiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShaktiController],
    }).compile();

    controller = module.get<ShaktiController>(ShaktiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
