import { Column, Entity, ManyToOne,JoinColumn,PrimaryColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn,BeforeInsert } from 'typeorm';
import { maker } from '../maker/maker.entity';
import { unit } from '../unit/unit.entity';
import { type } from '../type/type.entity';


@Entity('item')
export class item {

  @PrimaryColumn({ unique: true })
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

  @Column()
  item_bom: string;

  @CreateDateColumn({type : 'datetime', nullable : true })
  item_created: Date;

  @BeforeInsert()
  setCreatedDate() {
    this.item_created = new Date();
  }


  @UpdateDateColumn({ nullable: true, default: null })
  item_updated: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  item_deleted: Date;
  
  @Column({ type: 'boolean', default: false })
  item_use: boolean;

  

}