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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';
import { BadRequestException } from '@nestjs/common/exceptions';

@ApiTags('tasks')
@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('projects/:projectId/tasks')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task in a project' })
  @ApiParam({ name: 'projectId', description: 'Project ID', type: Number, example: 1 })
  @ApiResponse({ 
    status: 201, 
    description: 'Task successfully created',
    type: CreateTaskDto 
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(projectId, createTaskDto);
  }

  @Get('tasks/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number, example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns task details with project and assignee information' 
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch('tasks/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number, example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Task successfully updated' 
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation error' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Get('projects/:projectId/tasks')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tasks for a project with optional filters' })
  @ApiParam({ name: 'projectId', description: 'Project ID', type: Number, example: 1 })
  @ApiQuery({ 
    name: 'status', 
    required: false, 
    enum: TaskStatus,
    description: 'Filter by task status',
    example: 'TODO'
  })
  @ApiQuery({ 
    name: 'assigneeId', 
    required: false, 
    type: Number,
    description: 'Filter by assignee user ID',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns list of tasks for the project' 
  })
  @ApiResponse({ status: 400, description: 'Invalid status value' })
  @ApiResponse({ status: 404, description: 'Project not found' })
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