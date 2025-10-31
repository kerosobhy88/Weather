import { createContext, useContext, useState } from 'react'


const ThemeContext = createContext()


export function ThemeProvider({ children }) {
const [theme, setTheme] = useState('light')
return (
<ThemeContext.Provider value={{ theme, setTheme }}>
<div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', minHeight: '100vh', padding: 20 }}>
{children}
</div>
</ThemeContext.Provider>
)
}


export function ThemedButton() {
const { theme, setTheme } = useContext(ThemeContext)
return (
<button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
Current theme: {theme}
</button>
)
}