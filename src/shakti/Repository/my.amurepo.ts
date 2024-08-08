import { Repository } from 'typeorm';
import { shakti } from '../Entity/shakti.entity';

export class ShaktiRepository extends Repository<shakti> {
  async findByRole(role: string): Promise<shakti[]> {
    return this.find({ where: { role } });
  }
}
