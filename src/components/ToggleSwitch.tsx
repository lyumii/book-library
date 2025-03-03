import { DarkModeContext } from "./DarkModeContext";
import { useContext } from "react";

export default function ToggleSwitch() {
  const context = useContext(DarkModeContext);
  const theme = context.theme;
  const toggleMode = context.toggleMode;

  return (
    <button onClick={toggleMode}>
      Switch to {theme === "light" ? "light" : "dark"}
    </button>
  );
}
