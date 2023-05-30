import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unit')
export class unit {
  
  @Column({ unique: true })
  unit_code: string;

  @Column()
  unit_name: string;

}


