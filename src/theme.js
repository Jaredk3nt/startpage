const font = {
    family: "'IBM Plex Sans', sans-serif",
    regular: 500
}

const size = {
    toolbar: 50
}

const theme = {
    light: {
        font,
        size,
        bg: '#fff',
        bg_secondary: '#ededed',
        bg_tertiary: '#dedede',
        fg: '#23272A',
        shadow: '-1px 0px 15px rgba(0,0,0,.2), -1px 0px 20px rgba(0,0,0,.1)'
    },
    dark: {
        font,
        size,
        bg: '#23272A',
        bg_secondary: '#2C2F33',
        bg_tertiary: '#41474f',
        fg: '#fff',
        shadow: '-1px 0px 15px rgba(0,0,0,.6), -1px 0px 20px rgba(0,0,0,.2)'
    }
}

export default theme;