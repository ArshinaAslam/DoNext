import { container } from "tsyringe";
import { DI_TYPES } from "../common/di/types";
import { TaskService } from "../services/implementation/task.service";
import { TaskRepository } from "../repositories/implementation/task.repository";

container.registerSingleton(DI_TYPES.TaskRepository, TaskRepository);
container.registerSingleton(DI_TYPES.TaskService, TaskService);
