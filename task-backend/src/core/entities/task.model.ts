import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { StatusTask } from '../enums';
import { DataTypes } from 'sequelize';
import User from './user.model';

@Table
export default class Task extends Model {
  @Column({
    type: 'VARCHAR',
    allowNull: false,
  })
  name: string;

  @Column({
    type: 'VARCHAR',
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(StatusTask)),
    values: Object.values(StatusTask),
    allowNull: false,
    defaultValue: StatusTask.Todo,
  })
  status: StatusTask;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
