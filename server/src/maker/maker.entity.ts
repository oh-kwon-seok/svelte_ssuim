import { Column, Entity, ManyToOne,JoinColumn,PrimaryColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn } from 'typeorm';
import {item} from '../item/item.entity';

@Entity('maker')
export class maker {
 
  @PrimaryColumn({ unique: true })
  maker_code: string;

  @Column()
  maker_name: string;
 
  // @OneToMany(()=> item, item => item.item_maker)
  // items : item[];

  @CreateDateColumn()
  maker_created: Date;

  @UpdateDateColumn()
  maker_updated: Date;

  @DeleteDateColumn()
  maker_deleted: Date;
  
  @Column({ type: 'boolean', default: false })
  maker_use: boolean;


}



