import { useState, useEffect } from "react";
import { ReactNode } from "react";
import { DarkModeContext } from "./DarkModeContext";

type Props = {
  children: ReactNode;
};

export default function Theme({ children }: Props) {
  const [theme, setTheme] = useState("light");

  const toggleMode = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <DarkModeContext.Provider value={{ theme, toggleMode }}>
      <div>{children}</div>
    </DarkModeContext.Provider>
  );
}
