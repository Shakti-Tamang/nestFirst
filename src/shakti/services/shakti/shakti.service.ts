import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jina } from 'src/shakti/Entity/ram.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ShaktiServiceInterface } from './shakti.serviceinterface';
import { Personaddress } from 'src/shakti/Entity/address.shakti';

@Injectable()

export class ShaktiService implements ShaktiServiceInterface {
  private readonly saltRounds = 10; // Number of salt rounds for bcrypt

  constructor(
    @InjectRepository(jina)
    private readonly jinaRepository: Repository<jina>,

    @InjectRepository(Personaddress)
    private readonly AddressRepository:Repository<Personaddress>,
  ) {}

  // Asynchronous means performing tasks in the background without blocking the main
  //  thread, 

  async create(dto: jina): Promise<jina> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);

    // Create a new jina entity with the hashed password
    const jinaa = this.jinaRepository.create({...dto, password: hashedPassword, // Set the hashed password
    });

    // Save the jina entity along with any related entities
    return await this.jinaRepository.save(jinaa);
  }


  // Here, async allows the function to wait for this.jinaRepository.findOneBy({ id }) 
  // to complete before returning the result. This means your application can 
  // handle other operations in the meantime, rather than being stuck waiting for
  //  the database query to finish.


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
