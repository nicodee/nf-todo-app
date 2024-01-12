import { Typography } from "antd";
import { memo, useCallback } from "react";
import { TaskType } from "../../types";
import { useStore } from "../../store";

export const EditTask = memo(function EditTask({
  editMode,
  task,
  toggleEditMode,
}: {
  editMode: boolean;
  task: TaskType;
  toggleEditMode: () => void;
}) {
  const { editTask } = useStore();

  const handleChange = useCallback(
    (value: string) => {
      if (!value) {
        alert("Task cannot be empty");
        toggleEditMode();
        return;
      }
      editTask(task.id, value);
      toggleEditMode();
    },
    [editTask, task.id, toggleEditMode],
  );

  return (
    <Typography.Text
      data-testid="edit-task-item"
      editable={{
        autoSize: { minRows: 1, maxRows: 1 },
        editing: editMode,
        enterIcon: null,
        text: task.title,
        onChange: handleChange,
        onCancel: toggleEditMode,
      }}
    >
      Edit Task
    </Typography.Text>
  );
});
