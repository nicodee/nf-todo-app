import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TaskType, Tasks } from "./types";

type Store = {
  tasks: Tasks;
  addTask: (newTask: TaskType) => void;
  clearCompletedTasks: () => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newTaskTitle: string) => void;
  markTaskAsCompleted: (taskId: string) => void;
  markTaskAsActive: (taskId: string) => void;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
};

type OldStore = {
  tasks: {
    [key: string]: TaskType;
  };
  addTask: (newTask: TaskType) => void;
  clearCompletedTasks: () => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newTaskTitle: string) => void;
  markTaskAsCompleted: (taskId: string) => void;
  markTaskAsActive: (taskId: string) => void;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
};

const migrateStateFromV0 = (oldState: OldStore) => {
  const tasks = Object.values(oldState.tasks);
  return { tasks };
};

export const useStore = create(
  persist<Store>(
    set => ({
      tasks: [],
      addTask: (newTask: TaskType) =>
        set(state => ({ tasks: [...state.tasks, newTask] })),
      clearCompletedTasks: () =>
        set(state => ({
          tasks: state.tasks.filter(task => !task.completed),
        })),
      deleteTask: (taskId: string) =>
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== taskId),
        })),
      editTask: (taskId: string, newTaskTitle: string) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, title: newTaskTitle } : task,
          ),
        })),
      markTaskAsCompleted: (taskId: string) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task,
          ),
        })),
      markTaskAsActive: (taskId: string) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, completed: false } : task,
          ),
        })),
      moveTask: (dragIndex: number, hoverIndex: number) =>
        set(state => {
          const newTasks = [...state.tasks];
          const dragTask = newTasks[dragIndex];
          newTasks.splice(dragIndex, 1);
          newTasks.splice(hoverIndex, 0, dragTask);
          return { tasks: newTasks };
        }),
    }),
    {
      name: "nf-todo-app-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate(persistedState: unknown, version) {
        if (version === 0) {
          const migratedState = migrateStateFromV0(persistedState as OldStore);
          return { ...(persistedState as OldStore), ...migratedState };
        }
        return persistedState as Store;
      },
    },
  ),
);
