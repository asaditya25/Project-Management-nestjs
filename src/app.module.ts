import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/task.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/project.module';

@Module({
  imports: [PrismaModule, TasksModule, UsersModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}