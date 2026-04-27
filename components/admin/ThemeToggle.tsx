'use client'

import { Sun, Moon } from 'lucide-react'
import { useAdminTheme } from './AdminThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAdminTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 
        bg-white/[0.02] hover:bg-white/[0.1] border border-white/[0.08]
        dark:bg-white/[0.02] dark:hover:bg-white/[0.1] dark:border-white/[0.08]
        light:bg-black/[0.05] light:hover:bg-black/[0.1] light:border-black/[0.1]
        group relative overflow-hidden"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="flex items-center justify-center w-5 h-5 relative">
        <Sun 
          className={`w-5 h-5 text-yellow-500 transition-all duration-500 absolute
            ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} 
        />
        <Moon 
          className={`w-5 h-5 text-blue-400 transition-all duration-500 absolute
            ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} 
        />
      </div>
      <span className="text-xs font-medium uppercase tracking-widest text-gray-400 group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  )
}
