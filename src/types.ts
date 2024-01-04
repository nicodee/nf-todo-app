export type TaskType = {
  id: string;
  title: string;
  completed: boolean;
};

export type Tasks = {
  [key: string]: TaskType;
};
