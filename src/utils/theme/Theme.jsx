
import { createTheme } from '@mui/material/styles';
import typography from './Typography';
import { shadows } from './Shadows';
import { baseDarkTheme, baselightTheme } from './defaultColors';
import components from './Components';
import { store } from '@/utils/store';

export const BuildTheme = () => {
    const customizer = store.getState().customizer;
    const themeMode = customizer.activeMode === 'dark' ? baseDarkTheme : baselightTheme;

    const baseMode = {
        palette : {
            mode: customizer.activeMode
        },
        typography: typography,
        shadows: shadows,
        shape: {
            borderRadius: 7,
        }
    };

    const theme = createTheme({
        ...baseMode,
        ...themeMode,
    });

    theme.components = components(theme);

    return theme;
};

const ThemeSettings = () => {
    const theme = BuildTheme();

    return theme;
};


export { ThemeSettings };
