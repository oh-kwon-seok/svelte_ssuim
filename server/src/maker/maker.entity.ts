import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { item } from 'src/item/item.entity';
@Entity()
export class maker {
  @PrimaryGeneratedColumn()
  maker_index: number;

  @Column({ unique: true })
  maker_id: string;

  @Column()
  maker_name: string;

 
  @OneToMany(() => item, item => item.item_maker)
  items: item[];

}


