import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/core/guard/auth.guard';
import { TaskService } from './task.service';
import { Request } from 'express';
import { TaskDTO, TaskUpdateDTO } from 'src/core/dto/task.dto';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Body()
    createTaskDto: TaskDTO,
    @Req() req: Request,
  ) {
    const userId = req.tokenData?.id;

    return this.taskService.createTask(createTaskDto, userId as number);
  }

  @Get()
  async getAllTasks(@Req() req: Request) {
    const userId = req.tokenData?.id;
    console.log(userId);

    return this.taskService.getAllTasks(userId as number);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number, @Req() req: Request) {
    const userId = req.tokenData?.id;

    return this.taskService.getTaskById(id, userId as number);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body()
    updateTaskDto: TaskUpdateDTO,
    @Req() req: Request,
  ) {
    const userId = req.tokenData?.id;

    return this.taskService.updateTask(id, updateTaskDto, userId as number);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number, @Req() req: Request) {
    const userId = req.tokenData?.id;

    return this.taskService.deleteTask(id, userId as number);
  }
}
