import { Inject, Injectable } from "@nestjs/common";
import { IProjectRepository } from "../projects.repository";

@Injectable()
export class FindAllProjectsUseCase {

    constructor(
        @Inject('IProjectRepository')
        private projectRepo: IProjectRepository) { }


    execute() {
        return this.projectRepo.findAll();
    }
}