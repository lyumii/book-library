import { createContext } from "react";

export type DarkModeContextType = {
  theme: string;
  toggleMode: () => void;
};

const defaultContextValue: DarkModeContextType = {
  theme: "light",
  toggleMode: () => {},
};

export const DarkModeContext =
  createContext<DarkModeContextType>(defaultContextValue);
