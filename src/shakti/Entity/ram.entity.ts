import { IsEmail, IsNotEmpty } from "class-validator";
import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class jina{
@PrimaryGeneratedColumn()
id:number;

// validation suing pipeline

@Column()
@IsNotEmpty()
username:string;

@Column()
@IsEmail()
@IsNotEmpty()
email:string;

@Column()
@IsNotEmpty()
password:string;

@Column()
@IsNotEmpty()
role:string;
}