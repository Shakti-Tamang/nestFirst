import { jina } from "src/shakti/Entity/ram.entity";

export interface ShaktiServiceInterface {
    create(dto: jina): Promise<jina>;
    find(email: string): Promise<jina>;

    findMany(): Promise<jina[]>;
    
    deleteById(id: number): Promise<void>;
    findOne(id: number): Promise<jina | null>;
    editDetail(dto: jina): Promise<jina | null>;
  }
  