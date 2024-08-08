import { Test, TestingModule } from '@nestjs/testing';
import { shaktiService} from './shakti.service';

describe('ShaktiService', () => {
  let service: shaktiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [shaktiService],
    }).compile();

    service = module.get<shaktiService>(shaktiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
