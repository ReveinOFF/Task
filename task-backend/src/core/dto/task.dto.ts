import { StatusTask } from '../enums';

export class TaskDTO {
  name: string;
  description: string;
}

export class TaskUpdateDTO {
  name: string;
  description: string;
  status: StatusTask;
}
