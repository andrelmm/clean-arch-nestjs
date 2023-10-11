import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsWithUseCaseController } from './projects-with-use-case.controller';
import { CreateProjectUseCase } from './user-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './user-cases/find-all-projects.use-case';
import { StartProjectUseCase } from './user-cases/start-project.use-case';
import { ProjectTypeOrmRepository } from './projects.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsWithUseCaseController],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository
    }
  ],
})
export class ProjectsModule { }
