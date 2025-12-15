import { Controller, Get, Post, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK) // 200
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) // 200
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }
}