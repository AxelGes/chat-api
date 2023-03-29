import { Column, Entity } from 'typeorm';
import { EntityBase } from '../../../common/models/entity.model';

@Entity()
export class User extends EntityBase {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
