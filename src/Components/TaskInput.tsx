import type { InputRef } from "antd";
import { memo, useCallback, useRef, useState } from "react";

import { useStore } from "../store";
import {
  StyledCreateTaskInputWrapper,
  StyledCreateTaskInput,
  StyledFloatButton,
} from "../styles";
import { PlusOutlined } from "@ant-design/icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskInput = memo(function TaskInput() {
  const inputRef = useRef<InputRef>(null);
  const [parent] = useAutoAnimate();
  const { addTask } = useStore();
  const [task, setTask] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddTask = useCallback(
    (task: string) => {
      addTask({
        id: Date.now().toString(),
        title: task,
        completed: false,
      });
    },
    [addTask],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTask(event.target.value);
    },
    [],
  );

  const handleClick = useCallback(() => {
    if (!task) return;
    handleAddTask(task);
    setTask("");
  }, [handleAddTask, task]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleClick();
      }
    },
    [handleClick],
  );

  const handleFocusInput = useCallback(() => {
    inputRef.current?.focus({ cursor: "start" });
    if (location.pathname === "/complete") {
      navigate("/active");
    }
    setInputFocused(true);
  }, [location.pathname, navigate]);

  const handleBlurInput = useCallback(() => {
    if (!task) {
      setInputFocused(false);
    }
  }, [task]);

  return (
    <StyledCreateTaskInputWrapper ref={parent}>
      <StyledCreateTaskInput
        ref={inputRef}
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
        bordered={false}
        onChange={handleChange}
        data-testid="task-input"
        placeholder="Create some tasks ..."
        value={task}
        onPressEnter={handleKeyUp}
      />

      {!inputFocused && (
        <StyledFloatButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleFocusInput}
        />
      )}
    </StyledCreateTaskInputWrapper>
  );
});
