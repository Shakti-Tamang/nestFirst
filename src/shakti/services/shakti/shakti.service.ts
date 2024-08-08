import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jina } from 'src/shakti/Entity/ram.entity';
import { Repository } from 'typeorm';
import { ShaktiServiceInterface } from './shakti.serviceinterface';

@Injectable()
export class ShaktiService implements ShaktiServiceInterface {
  constructor(
    @InjectRepository(jina)
    private readonly jinaRepository: Repository<jina>,
  ) {}

  // Saving
  async create(dto: jina): Promise<jina> {
    const jinaa = this.jinaRepository.create(dto);
    return await this.jinaRepository.save(jinaa);
  }

  // To check if user exists
  async find(email: string): Promise<jina[]> {
    return this.jinaRepository.find({ where: { email } });
  }

  // Get all
  async findMany(): Promise<jina[]> {
    return this.jinaRepository.find();
  }

  // Delete by ID
  async deleteById(id: number): Promise<void> {
    await this.jinaRepository.delete(id);
  }

  // Get one by ID
  async findOne(id: number): Promise<jina | null> {
    return this.jinaRepository.findOneBy({ id });
  }

  // Editing
  async editDetail(dto: jina): Promise<jina | null> {
    const shakti = await this.jinaRepository.findOneBy({ id: dto.id });
    if (!shakti) {
      throw new NotFoundException('User not found');
    }
    shakti.role = dto.role;
    shakti.username = dto.username;
    return this.jinaRepository.save(shakti);
  }
}
