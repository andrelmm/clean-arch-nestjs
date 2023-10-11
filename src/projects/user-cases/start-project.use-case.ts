import { Inject, Injectable } from "@nestjs/common";
import { StartProjectDto } from "../dto/start-project.dto";
import { IProjectRepository } from "../projects.repository";

@Injectable()
export class StartProjectUseCase {

    constructor(
        @Inject('IProjectRepository')
        private projectRepo: IProjectRepository) { }


    async execute(id: string, input: StartProjectDto) {
        const project = await this.projectRepo.findById(id);
        project.start(input.started_at)
        this.projectRepo.update(project);
        return project;
    }
}