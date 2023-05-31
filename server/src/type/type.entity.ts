import { Column, Entity, ManyToOne,JoinColumn,PrimaryColumn,CreateDateColumn,UpdateDateColumn,DeleteDateColumn } from 'typeorm';

@Entity('type')
export class type {
  @PrimaryColumn({ unique: true })
  type_code: string;

  @Column()
  type_name: string;
  
  @CreateDateColumn()
  type_created: Date;

  @UpdateDateColumn()
  type_updated: Date;

  @DeleteDateColumn()
  type_deleted: Date;
  
  @Column({ type: 'boolean', default: false })
  type_use: boolean;
 
}


