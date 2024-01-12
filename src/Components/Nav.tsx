import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../store";
import { Button, Flex } from "antd";
import { StyledNavButton } from "../styles";

const NavButton = memo(function NavButton({
  children,
  dataTestId,
  to,
}: {
  children: React.ReactNode;
  dataTestId: string;
  to: string;
}) {
  return (
    <StyledNavButton>
      <NavLink
        data-testid={dataTestId}
        className={navData => (navData.isActive ? "active" : "")}
        to={to}
      >
        {children}
      </NavLink>
    </StyledNavButton>
  );
});

export const Nav = memo(function Nav() {
  const { allTasks, activeTasks, completeTasks } = useStore(state => ({
    allTasks: Object.entries(state.tasks).length,
    activeTasks: Object.entries(state.tasks).filter(
      ([, task]) => !task.completed,
    ).length,
    completeTasks: Object.entries(state.tasks).filter(
      ([, task]) => task.completed,
    ).length,
  }));

  return (
    <Flex gap={10} wrap="wrap">
      <NavButton to={`/`} dataTestId="nav-button-all">
        <Button type="primary" className="all">
          All Tasks: {allTasks}
        </Button>
      </NavButton>
      <NavButton to={`/active`} dataTestId="nav-button-incomplete">
        <Button type="primary" className="active">
          Incomplete: {activeTasks}
        </Button>
      </NavButton>
      <NavButton to={`/complete`} dataTestId="nav-button-completed">
        <Button type="primary" className="completed">
          Completed: {completeTasks}
        </Button>
      </NavButton>
    </Flex>
  );
});
