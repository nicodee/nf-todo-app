import { memo } from "react";
import { TaskList } from "../Components/TaskList";
import { useStore } from "../store";

export const CompletedTasks = memo(function CompletedTasks() {
    const tasks = useStore(
        state => Object.fromEntries(
            Object.entries(state.tasks).filter(
                ([, task]) => task.completed
            )
        )
    );

    return (
        <div>
            <h1>Completed tasks</h1>
            <TaskList tasks={tasks} />
        </div>
    );
})