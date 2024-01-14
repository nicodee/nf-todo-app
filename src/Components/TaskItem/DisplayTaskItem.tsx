import { memo, useCallback } from "react";
import { Checkbox, Typography } from "antd";
import { TaskType } from "../../types";
import { useStore } from "../../store";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

export const DisplayTaskItem = memo(function DisplayTaskItem({
  handleToggleEditMode,
  task,
}: {
  handleToggleEditMode: (event: any) => void;
  task: TaskType;
}) {
  const { markTaskAsCompleted, markTaskAsActive } = useStore();

  const handleChange = useCallback(
    (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        markTaskAsCompleted(task.id);
      } else {
        markTaskAsActive(task.id);
      }
    },
    [markTaskAsActive, markTaskAsCompleted, task.id],
  );

  return (
    <Checkbox
      data-taskid={task.id}
      data-testid={`task-item-${task.id}`}
      onChange={handleChange}
      checked={task.completed}
    >
      <Typography.Text delete={task.completed} onClick={handleToggleEditMode}>
        {task.title}
      </Typography.Text>
    </Checkbox>
  );
});
