import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectUseCase } from './user-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './user-cases/find-all-projects.use-case';
import { StartProjectDto } from './dto/start-project.dto';
import { StartProjectUseCase } from './user-cases/start-project.use-case';

@Controller('projects')
export class ProjectsWithUseCaseController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly findAllProjectsUseCase: FindAllProjectsUseCase,
    private readonly startProjectUseCase: StartProjectUseCase,
  ) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(id);
  // }

  @Post(':id/start')
  update(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(id);
  // }
}
