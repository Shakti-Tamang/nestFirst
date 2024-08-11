import {  IsNotEmpty } from "class-validator";
import { Column, Entity,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { jina } from "./ram.entity";


@Entity()
export class Personaddress{
@PrimaryGeneratedColumn()
address_id:number;

@Column()
@IsNotEmpty()
streetAddress:string;

@Column()
@IsNotEmpty()
state:string;

@Column()
@IsNotEmpty()
city:string;

@Column()
@IsNotEmpty()
zipcode:string;

@OneToOne(() => jina, (jina) => jina.add) // Corrected: use 'jina' instead of 'Jina'
jina: jina;

}