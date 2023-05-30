import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user {

  @Column({ unique: true })
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  user_password: string;
}