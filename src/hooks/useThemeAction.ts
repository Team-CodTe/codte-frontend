import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const useThemeAction = () => {
  const { theme = 'system', setTheme } = useTheme();

  const handleToggleTheme = () => {
    const nextTheme =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';

    setTheme(nextTheme);
  };

  const ThemeIcon =
    theme === 'light' ? SunIcon : theme === 'dark' ? MoonIcon : MonitorIcon;

  return {
    theme,
    setTheme,
    handleToggleTheme,
    ThemeIcon,
  };
};
