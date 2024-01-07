import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TaskType, Tasks } from './types';

type  Store = {
  tasks: Tasks;
  addTask: (newTask:TaskType) => void;
  clearCompletedTasks: () => void;
  completedTasks: () => [string, TaskType][];
  markTaskAsCompleted: (taskId: string) => void;
  markTaskAsActive: (taskId: string) => void;
};

export const useStore = create(
  persist<Store>(
    (set, get) => ({
      tasks: {},
      addTask: (newTask: TaskType) => set((state) => ({ tasks: { ...state.tasks, [newTask.id]: newTask }})),
      clearCompletedTasks: () => set((state) => ({ 
        tasks: Object.fromEntries(
          Object.entries(state.tasks).filter(([_, task]) => !task.completed)
        )
      })),
      completedTasks: () => Object.entries(get().tasks).filter(([_, task]) => !task.completed),
      editTask: (taskId: string, newTaskTitle: string) => set(
        (state) => ({ 
          tasks: { ...state.tasks, [taskId]: { ...state.tasks[taskId], title: newTaskTitle }}
        })
      ),
      markTaskAsCompleted: (taskId: string) => set(
        (state) => ({
          tasks: { 
            ...state.tasks,
            [taskId]: {
              ...state.tasks[taskId],
              completed: true
            }
          }
        })
      ),
      markTaskAsActive: (taskId: string) => set(
        (state) => ({ 
          tasks: { 
            ...state.tasks,
            [taskId]: { 
              ...state.tasks[taskId],
              completed: false 
            }
          }
        })
      ),
    }),
    {
      name: 'nf-todo-app-storage',
      storage: createJSONStorage(()=> localStorage),
    },
  ),
);