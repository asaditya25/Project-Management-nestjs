import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: number, createTaskDto: CreateTaskDto) {
    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Verify assignee exists if provided
    if (createTaskDto.assigneeId) {
      const assignee = await this.prisma.user.findUnique({
        where: { id: createTaskDto.assigneeId },
      });

      if (!assignee) {
        throw new BadRequestException(`Assignee with ID ${createTaskDto.assigneeId} does not exist`);
      }
    }

    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        projectId,
      },
      include: {
        project: true,
        assignee: true,
      },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    // Verify task exists
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Verify assignee exists if being updated
    if (updateTaskDto.assigneeId) {
      const assignee = await this.prisma.user.findUnique({
        where: { id: updateTaskDto.assigneeId },
      });

      if (!assignee) {
        throw new BadRequestException(`Assignee with ID ${updateTaskDto.assigneeId} does not exist`);
      }
    }

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
        ...(status !== undefined && { status }),
        ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
      },
      include: {
        project: true,
        assignee: true,
      },
    });
  }

  async findByProject(
    projectId: number,
    status?: TaskStatus,
    assigneeId?: number,
  ) {
    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    return this.prisma.task.findMany({
      where: {
        projectId,
        ...(status && { status }),
        ...(assigneeId && { assigneeId }),
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}