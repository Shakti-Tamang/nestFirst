import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { jina } from "../Entity/ram.entity";
import { Repository } from "typeorm";


// providers

@Injectable()
export class shaktiService{
    constructor(@InjectRepository(jina) private readonly jinaRepository:Repository<jina>){

    }

    async create(dto:jina){
const jinaa=this.jinaRepository.create(dto);
return await this.jinaRepository.save(jinaa);

    }
}