import { Column, Entity, ManyToOne,JoinColumn } from 'typeorm';
import { maker } from '../maker/maker.entity';
import { unit } from '../unit/unit.entity';
import { type } from '../type/type.entity';


@Entity('item')
export class item {

  @Column({ unique: true })
  item_code: string;

  @Column()
  item_name: string;


  @ManyToOne(() => maker)
  @JoinColumn({ name: 'item_maker' }) 
  item_maker: maker;

  
  @ManyToOne(() => unit)
  @JoinColumn({ name: 'item_unit' }) 
  item_unit: unit;

  @ManyToOne(() => type)
  @JoinColumn({ name: 'item_type' }) 
  item_type: type;


  

}