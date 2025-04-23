import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskDTO, TaskUpdateDTO } from 'src/core/dto/task.dto';
import Task from 'src/core/entities/task.model';
import User from 'src/core/entities/user.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  /**
   * Create a new task and assign users
   * @param createTaskDto - New task data
   * @param userId - User ID
   * @returns Task - Created task
   */
  async createTask(createTaskDto: TaskDTO, userId: number): Promise<Task> {
    const task = await this.taskModel.create({
      ...createTaskDto,
      userId,
    });

    return task;
  }

  /**
   * Get all tasks
   * @param userId - User ID
   * @returns Task[] - List of tasks
   */
  async getAllTasks(userId: number): Promise<Task[]> {
    return this.taskModel.findAll({
      where: { userId: userId },
    });
  }

  /**
   * Get a task by ID
   * @param id - Task ID
   * @param userId - User ID
   * @returns Task - The found task
   */
  async getTaskById(id: number, userId: number): Promise<Task> {
    const task = await this.taskModel.findOne({
      where: { id: id, userId: userId },
      include: [User],
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  /**
   * Update a task
   * @param id - Task ID
   * @param updateTaskDto - Task update data
   * @param userId - User ID
   * @returns Task - Updated task
   */
  async updateTask(
    id: number,
    updateTaskDto: TaskUpdateDTO,
    userId: number,
  ): Promise<Task> {
    const task = await this.getTaskById(id, userId);

    await task.update(updateTaskDto);

    return task;
  }

  /**
   * Delete a task
   * @param id - Task ID
   * @param userId - User ID
   * @returns void
   */
  async deleteTask(id: number, userId: number): Promise<void> {
    const task = await this.getTaskById(id, userId);

    await task.destroy();
  }
}
