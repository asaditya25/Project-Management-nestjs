import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    // Verify owner exists
    const owner = await this.prisma.user.findUnique({
      where: { id: createProjectDto.ownerId },
    });

    if (!owner) {
      throw new BadRequestException(`Owner with ID ${createProjectDto.ownerId} does not exist`);
    }

    return this.prisma.project.create({
      data: createProjectDto,
      include: {
        owner: true,
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            tasks: true,
            members: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tasks: true,
        members: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }
}