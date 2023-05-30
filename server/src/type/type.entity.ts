import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type')
export class type {
  @Column({ unique: true })
  type_code: string;

  @Column()
  type_name: string;

 
}


