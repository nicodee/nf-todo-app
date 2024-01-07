import { memo } from "react";
import { TaskList } from "../Components/TaskList";
import { useStore } from "../store";

export const AllTasks = memo(() => {
    const { tasks } = useStore();

    return (
        <div>
        <h1>All tasks</h1>
        <TaskList tasks={tasks} />
        </div>
    );
})