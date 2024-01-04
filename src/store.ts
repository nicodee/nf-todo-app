import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TaskType } from './types';

type  Store = {
  tasks: TaskType[];
  addTask: (newTask:string) => void;
  clearCompletedTasks: () => void;
};

export const useStore = create(
  persist<Store>(
    (set) => ({
      tasks: [],
      addTask: (newTask: string) => set((state) => ({ tasks: [...state.tasks, { id: Date.now().toString(), title: newTask, completed: false }] })),
      clearCompletedTasks: () => set((state) => ({ tasks: []})),
    }),
    {
      name: 'nf-todo-app-storage',
      storage: createJSONStorage(()=> localStorage),
    },
  ),
);