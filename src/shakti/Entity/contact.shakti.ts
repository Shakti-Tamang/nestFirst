import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { jina } from "./ram.entity";

@Entity()
export class PersonContact{

    @PrimaryGeneratedColumn()
    contact_id:number;

    @Column({ type: 'bigint' })
    @IsNotEmpty()
    contactNumber:number;

    @Column()
    @IsNotEmpty()
    contactInfo:string;


    @Column()
    @IsNotEmpty()
    contactSource:string;

  // Foreign key column to store the id of the related jina entity
  @Column()
  jina_Id: number;


  // Many-to-One relationship with jina
  @ManyToOne(() => jina, (jina) => jina.con)
  @JoinColumn({ name: 'jina_Id' }) // Specify the column name for the foreign key
  jina: jina;
    

}