import { memo } from "react";
import { Nav } from "./Nav";
import { TaskInput } from "./TaskInput";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Header = memo(function Header() {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      <TaskInput />
      <Nav />
    </div>
  );
});
