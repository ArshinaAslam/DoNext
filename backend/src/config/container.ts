import { container } from "tsyringe";
import { DI_TYPES } from "../common/di/types";
import { TaskService } from "../services/implementation/task.service";
import { TaskRepository } from "../repositories/implementation/task.repository";
import { AuthService } from "../services/implementation/auth.service";
import { UserRepository } from "../repositories/implementation/user.repository";

container.registerSingleton(DI_TYPES.TaskRepository, TaskRepository);
container.registerSingleton(DI_TYPES.TaskService, TaskService);
container.registerSingleton(DI_TYPES.UserRepository, UserRepository);
container.registerSingleton(DI_TYPES.AuthService, AuthService);
