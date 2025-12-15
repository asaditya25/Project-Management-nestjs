import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // CREATE TASK FOR A PROJECT
  async create(projectId: number, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        projectId,
      },
    });
  }

  // GET TASK BY ID
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
        assignee: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // UPDATE TASK
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { assigneeId, status, dueDate, ...restData } = updateTaskDto;
    
    return this.prisma.task.update({
      where: { id },
      data: {
        ...restData,
        ...(assigneeId !== undefined && {
          assignee: assigneeId === null 
            ? { disconnect: true }
            : { connect: { id: assigneeId } }
        }),
        ...(status !== undefined && { status: status as any }),
        ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
      },
    });
  }

  // GET TASKS FOR A PROJECT (with filters)
  async findByProject(
    projectId: number,
    status?: TaskStatus,
    assigneeId?: number,
  ) {
    return this.prisma.task.findMany({
      where: {
        projectId,
        status,
        assigneeId,
      },
    });
  }
}