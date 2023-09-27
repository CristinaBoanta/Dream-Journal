import { createContext, useState } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children } : any) => {

    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
      setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    }
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };