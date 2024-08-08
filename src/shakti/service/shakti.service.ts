import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { jina } from "../Entity/ram.entity";
import { Repository } from "typeorm";


// providers

@Injectable()
export class shaktiService{
    constructor(@InjectRepository(jina) private readonly jinaRepository:Repository<jina>){  

    }


    // saving

    async create(dto:jina){
const jinaa=this.jinaRepository.create(dto);
return await this.jinaRepository.save(jinaa);
    }


    // to check user existed
    async find(role: string): Promise<jina[]> {
        return this.jinaRepository.findBy({ role });
    }


    // getAll
async findMany(): Promise<jina[]> {
        return this.jinaRepository.find();
        
    }



// The function is expected to return a Promise that resolves to either an object 
// of type jina or null if no such entity is found.
async deleteById(id: number) {
    return await this.jinaRepository.delete(id);   
}



// get one
// Retrieve a single entity by ID
async findOne(id: number): Promise<jina | null> {
    return this.jinaRepository.findOneBy({ id });
}



// editing
async editDetail(dto: jina): Promise<jina | null> {
    const shakti = await this.jinaRepository.findOneBy({ id: dto.id });
    if (!shakti) {
        throw new NotFoundException('User not found');
    }
   shakti.role=dto.role;
   return this.jinaRepository.save(shakti);
}

}