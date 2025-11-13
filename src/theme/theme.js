import palette from "./palette";

const light = {
    text: {
        light: palette.dark[300],
        main: palette.dark[200],
        dark: palette.dark[100],
    },
    base: {
        0: palette.light[0],
        100: palette.light[100],
        200: palette.light[200],
        300: palette.light[300],
        400: palette.light[400],
        500: palette.light[500],
        600: palette.light[600],
        700: palette.light[700],
        800: palette.light[800],
        900: palette.light[900],
    },
    contrast: {
        0: palette.dark[0],
        100: palette.dark[200],
        200: palette.dark[400],
        300: palette.dark[600],
        400: palette.dark[800],
        500: palette.dark[1000],
        600: palette.dark[1200],
        700: palette.dark[1400],
        800: palette.dark[1600],
        900: palette.dark[1800],
    },
    accent: {
        0: palette.red[200],
        100: palette.red[400],
        200: palette.red[600],
        300: palette.red[800],
    },
    controls: {
        input: {
            height: 42,
            borderRadius: 8,
            borderWidth: 1,
            paddingHorizontal: 12,
            backgroundColor: palette.dark[700],
            borderColor: palette.dark[500],
            textColor: palette.light[200],
            placeholderColor: palette.light[600],
        },
        button: {
            height: 42,
            borderRadius: 8,
            borderWidth: 1,
            backgroundColor: palette.dark[700],
            borderColor: palette.dark[500],
            textColor: palette.light[200],
        },
    },

    tabBarBackgroundColor: palette.light[100],
    headerBackgroundColor: palette.light[100],
    tabBarInactive: palette.dark[100],
    tabBarActive: palette.red[100],
    headerTintColor: palette.dark[100]
};

const dark = {
    text: {
        light: palette.light[100],
        main: palette.light[200],
        dark: palette.light[300],
    },
    base: {
        0: palette.dark[0],
        100: palette.dark[100],
        200: palette.dark[200],
        300: palette.dark[300],
        400: palette.dark[400],
        500: palette.dark[500],
        600: palette.dark[600],
        700: palette.dark[700],
        800: palette.dark[800],
        900: palette.dark[900],
    },
    contrast: {
        0: palette.light[0],
        100: palette.light[300],
        200: palette.light[600],
        300: palette.light[900],
        400: palette.light[1200],
        500: palette.light[1500],
        600: palette.light[1200],
        700: palette.light[1400],
        800: palette.light[1600],
        900: palette.light[1800],
    },
    accent: {
        0: palette.red[900],
        100: palette.red[800],
        200: palette.red[600],
        300: palette.red[400],
    },
    // UI chrome for inputs & buttons
    controls: {
        input: {
            height: 42,
            borderRadius: 8,
            borderWidth: 1,
            paddingHorizontal: 12,
            backgroundColor: palette.dark[200],
            borderColor: palette.dark[400],
            textColor: palette.light[300],
            placeholderColor: palette.dark[900],
        },
        button: {
            height: 42,
            borderRadius: 8,
            borderWidth: 1,
            backgroundColor: palette.light[100],
            borderColor: palette.light[300],
            textColor: palette.dark[300],
        },
    },

    tabBarBackgroundColor: palette.light[100],
    headerBackgroundColor: palette.light[100],
    tabBarInactive: palette.dark[100],
    tabBarActive: palette.red[100],
    headerTintColor: palette.dark[100],
};

export default { light, dark };