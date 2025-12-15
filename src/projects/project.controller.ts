import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // POST /projects
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  // GET /projects
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // GET /projects/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }
}
