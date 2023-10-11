import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../entities/project.entity";
import { Inject, Injectable } from "@nestjs/common";
import { IProjectRepository } from "../projects.repository";

@Injectable()
export class CreateProjectUseCase {

    constructor(
        @Inject('IProjectRepository')
        private projectRepo: IProjectRepository) { }

    async execute(input: CreateProjectDto) {
        const project = new Project(input);
        await this.projectRepo.create(project);
        return project;
    }
}