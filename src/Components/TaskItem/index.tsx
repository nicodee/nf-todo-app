import { memo, useCallback, useMemo, useState } from "react";
import { DisplayTaskItem } from "./DisplayTaskItem";
import { EditTask } from "./EditTask";
import { TaskType } from "../../types";
import { StyledListItem } from "../../styles";
import {
  UndoOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useStore } from "../../store";

export const TaskItemContainer = memo(function TaskItemContainer({
  task,
}: {
  task: TaskType;
}) {
  const { deleteTask } = useStore();
  const [editMode, setEditMode] = useState(false);

  const handleDeleteTask = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  const handleToggleEditMode = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      if (event) {
        event.stopPropagation();
      }

      setEditMode(prev => !prev);
    },
    [],
  );

  const actions = useMemo(() => {
    if (editMode) {
      return [
        <Button type="text" onClick={handleToggleEditMode}>
          <UndoOutlined />
        </Button>,
      ];
    }
    return [
      <Popconfirm
        title="Delete the task"
        description="Are you sure you want to delete this task?"
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        onConfirm={handleDeleteTask}
        placement="topLeft"
      >
        <Button type="text">
          <DeleteOutlined />
        </Button>
      </Popconfirm>,
    ];
  }, [editMode, handleDeleteTask, handleToggleEditMode]);

  return (
    <StyledListItem actions={actions} data-testid="task-list-item">
      {editMode ? (
        <EditTask
          task={task}
          toggleEditMode={handleToggleEditMode}
          editMode={editMode}
        />
      ) : (
        <DisplayTaskItem
          handleToggleEditMode={handleToggleEditMode}
          task={task}
        />
      )}
    </StyledListItem>
  );
});
