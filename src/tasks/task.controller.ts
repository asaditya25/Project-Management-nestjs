import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';
import { BadRequestException } from '@nestjs/common/exceptions';


@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('projects/:projectId/tasks')
  @HttpCode(HttpStatus.CREATED) // 201
  create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(projectId, createTaskDto);
  }

  @Get('tasks/:id')
  @HttpCode(HttpStatus.OK) // 200
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch('tasks/:id')
  @HttpCode(HttpStatus.OK) // 200
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Get('projects/:projectId/tasks')
  @HttpCode(HttpStatus.OK) // 200
  findByProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('status') status?: TaskStatus,
    @Query('assigneeId') assigneeId?: string,
  ) {
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