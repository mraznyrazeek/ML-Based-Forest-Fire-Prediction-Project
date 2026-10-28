
import { ref, readonly } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'wildfire-intelligence-theme'

// Shared reactive state across the application
const theme = ref<Theme>('light')

function applyTheme(value: Theme): void {
  theme.value = value
  document.documentElement.setAttribute('data-theme', value)

  // Remember the selected theme
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Theme still works if storage is unavailable
  }
}

function initializeTheme(): void {
  let savedTheme: string | null = null

  try {
    savedTheme = localStorage.getItem(STORAGE_KEY)
  } catch {
    // Use light mode if storage is unavailable
  }

  applyTheme(savedTheme === 'dark' ? 'dark' : 'light')
}

function toggleTheme(): void {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
}

export function useTheme() {
  return {
    theme: readonly(theme),
    initializeTheme,
    applyTheme,
    toggleTheme,
  }
}
