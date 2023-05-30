import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import {item} from '../item/item.entity';

@Entity('maker')
export class maker {
 
  @Column({ unique: true })
  maker_code: string;

  @Column()
  maker_name: string;
  @OneToMany(()=> item, item => item.item_maker)
  items : item[];
}



