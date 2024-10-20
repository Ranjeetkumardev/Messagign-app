import { createContext , useContext ,useState} from "react";


// create a context 

const ThemeContext = createContext();

// create a provider components  
 export const ThemeProvider  = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
  
    const toggleDarkMode = () => {
      setIsDarkMode(prevMode => !prevMode);

    };

    return (
        <ThemeContext.Provider  value={{isDarkMode , toggleDarkMode}}>
          {children}
        </ThemeContext.Provider>
    )
}

// Create a custom hook for easier access to the context
export const useTheme = () => useContext(ThemeContext);