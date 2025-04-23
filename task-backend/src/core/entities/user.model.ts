import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Task from './task.model';

@Table
export default class User extends Model {
  @Column({
    type: 'VARCHAR',
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'VARCHAR',
    allowNull: false,
  })
  password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
