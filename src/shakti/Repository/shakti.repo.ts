import { Repository } from 'typeorm';
import { jina } from '../Entity/ram.entity';

export class JinaRepository extends Repository<jina> {
  async findByRole(role: string): Promise<jina[]> {
    return this.find({ where: { role} });
  }
}
