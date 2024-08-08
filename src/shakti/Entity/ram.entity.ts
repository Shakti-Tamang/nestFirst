import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class jina{
@PrimaryGeneratedColumn()
id:number;

@Column()
role:string;
}