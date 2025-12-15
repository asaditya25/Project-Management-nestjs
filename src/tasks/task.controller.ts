import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // POST /projects/:projectId/tasks
  @Post('projects/:projectId/tasks')
  create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(projectId, createTaskDto);
  }

  // GET /tasks/:id
  @Get('tasks/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  // PATCH /tasks/:id
  @Patch('tasks/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  // GET /projects/:projectId/tasks
  @Get('projects/:projectId/tasks')
  findByProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('status') status?: TaskStatus,
    @Query('assigneeId') assigneeId?: string,
  ) {
    // Validate status if provided
    if (status && !Object.values(TaskStatus).includes(status as TaskStatus)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${Object.values(TaskStatus).join(', ')}`);
    }

    return this.tasksService.findByProject(
      projectId,
      status,
      assigneeId ? Number(assigneeId) : undefined,
    );
  }
}