import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { maker } from '../maker/maker.entity';

@Entity()
export class item {
  @PrimaryGeneratedColumn()
  item_index: number;


  @ManyToOne(() => maker, maker => maker.items)
  item_maker: maker;


  @Column({ unique: true })
  item_code: string;

  @Column()
  item_name: string;

  @Column()
  item_password: string;
}