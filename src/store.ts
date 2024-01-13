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
  sortTasks: (newSortedTasks: Tasks) => void;
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
      sortTasks: (newSortedTasks: Tasks) =>
        set(() => ({
          tasks: newSortedTasks,
        })),
    }),
    {
      name: "nf-todo-app-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
