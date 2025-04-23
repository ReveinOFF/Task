import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Task from 'src/core/entities/task.model';
import User from 'src/core/entities/user.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Task, User]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
