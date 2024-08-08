import { Test, TestingModule } from '@nestjs/testing';
import { ShaktiService } from './shakti.service';

describe('ShaktiService', () => {
  let service: ShaktiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShaktiService],
    }).compile();

    service = module.get<ShaktiService>(ShaktiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
