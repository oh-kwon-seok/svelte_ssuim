import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class user {


  @PrimaryColumn({ unique: true })
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  user_password: string;
}