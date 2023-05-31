import { Column, Entity, ManyToOne,JoinColumn,PrimaryColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn } from 'typeorm';

@Entity('unit')
export class unit {
  
  @PrimaryColumn({ unique: true })
  unit_code: string;

  @Column()
  unit_name: string;


  @CreateDateColumn()
  unit_created: Date;

  @UpdateDateColumn()
  unit_updated: Date;

  @DeleteDateColumn()
  unit_deleted: Date;
  
  @Column({ type: 'boolean', default: false })
  unit_use: boolean;


}


