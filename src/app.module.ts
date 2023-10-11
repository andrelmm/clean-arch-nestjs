import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'memory',
      entities: [Project],
      synchronize: true,
    }),
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
