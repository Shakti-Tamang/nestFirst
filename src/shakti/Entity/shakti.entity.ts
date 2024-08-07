import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'amu'})
export class shakti{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
}