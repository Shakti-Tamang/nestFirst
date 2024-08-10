import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
import {  Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Personaddress } from "./address.shakti";
import { PersonContact } from "./contact.shakti";


@Entity()
export class jina{
@PrimaryGeneratedColumn()
 id:number;

// validation suing pipeline

@Column()
@IsNotEmpty()
 username:string;

@Column()
@IsNotEmpty()
@IsNumber()
 age:number;


//  This ensures that the email column in your database table must have unique 
//  values. No two records can have the same email address.
@Column({unique:true})
@IsEmail()
@IsNotEmpty()
email:string;

@Column()
@IsNotEmpty()
 password:string;

@Column()
@IsNotEmpty()
 role:string;

 
 @OneToOne(() => Personaddress, (add) => add.jina, { cascade: true })
 @JoinColumn({ name: 'address_id' })
 add: Personaddress;


 
  // One-to-Many relationship with PersonContact
  @OneToMany(() => PersonContact, (con) => con.jina, { cascade: true })
  con: PersonContact[];



// // getter and setter:
// public setId(id:number):void{
//     this.id=id;
// }
// public getId():number{
//     return this.id;
// }

// public setUserName(username:string):void{
//     this.username=username;
// }

// public getUserName():string{
//     return this.username;
// }

// public setAge(age:number):void{

//     this.age=age;
// }
// public getAge():number{
//     return this.age;
// }

// public setEmail(email:string):void{
//     this.email=email;
// }

// public getEmail():string{
//     return this.email
// }

// public setPassword(password:string):void{
//     this.password=password;
// }
// public getPassword():string{
//     return this.password;
// }

// public setRole(role:string):void{
//     this.role=role;
// }
// public getRole():string{
//     return this.role;
// }



}