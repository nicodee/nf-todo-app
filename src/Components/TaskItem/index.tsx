import type { Identifier, XYCoord } from "dnd-core";
import { memo, useCallback, useMemo, useRef, useState } from "react";
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
import { useDrag, useDrop } from "react-dnd";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ItemTypes = {
  TASK: "task",
};

export const TaskItemContainer = memo(function TaskItemContainer({
  id,
  task,
  index,
  moveTask,
}: {
  id: any;
  task: TaskType;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
}) {
  const { deleteTask } = useStore();
  const [editMode, setEditMode] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

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
        <Button type="text" data-testid="delete-task-button">
          <DeleteOutlined />
        </Button>
      </Popconfirm>,
    ];
  }, [editMode, handleDeleteTask, handleToggleEditMode]);

  return (
    <StyledListItem
      actions={actions}
      data-testid="task-list-item"
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
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
