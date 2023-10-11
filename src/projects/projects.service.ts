import { Body, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>) { }

  create(@Body() createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);

    if (createProjectDto.started_at) {
      project.status = ProjectStatus.Active;
    }

    return this.projectRepo.save(project);
  }

  findAll() {
    return this.projectRepo.find();
  }

  findOne(id: string) {
    return this.projectRepo.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneOrFail({ where: { id } });

    updateProjectDto.name && (project.name = updateProjectDto.name);
    updateProjectDto.description && (project.description = updateProjectDto.description);

    if (updateProjectDto.started_at) {
      if (project.status === ProjectStatus.Active) {
        throw new Error('Project is already active');
      }

      if (project.status === ProjectStatus.Completed) {
        throw new Error('Project is already completed');
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new Error('Project is already cancelled');
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Active;
    }

    if (updateProjectDto.cancelled_at) {

      if (project.status === ProjectStatus.Completed) {
        throw new Error('Project is already completed');
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new Error('Project is already cancelled');
      }

      if (updateProjectDto.cancelled_at < project.started_at) {
        throw new Error('Cancelled date cannot be earlier than started date');
      }

      project.cancelled_at = updateProjectDto.cancelled_at;
      project.status = ProjectStatus.Cancelled;
    }

    if (updateProjectDto.finished_at) {

      if (project.status === ProjectStatus.Completed) {
        throw new Error('Project is already completed');
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new Error('Project is already cancelled');
      }

      if (updateProjectDto.finished_at < project.started_at) {
        throw new Error('Finished date cannot be earlier than started date');
      }

      project.finished_at = updateProjectDto.finished_at;
      project.status = ProjectStatus.Completed;
    }

    return this.projectRepo.save(project);
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
