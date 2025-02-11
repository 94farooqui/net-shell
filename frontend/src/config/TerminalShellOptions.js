export const TerminalShellOptions = {
    theme: {
        background: "#070F2B", // Dark gray background
        foreground: "#9290C3", // White text
        cursor: "#00ff00", // Green cursor
        selection: "#007bff50", // Blue selection
        black: "#000000",
        red: "#ff0000",
        green: "#00ff00",
        yellow: "#ffff00",
        blue: "#0000ff",
        magenta: "#ff00ff",
        cyan: "#00ffff",
        white: "#ffffff",
    },
    fontSize: 14,
    fontFamily: "Fira Code, monospace",
    cursorBlink: true,
    cursorStyle: "block", // block, underline, bar
    allowTransparency: true,
    lineHeight: 1.2,
    rendererType: "canvas", // 'dom' or 'canvas' (canvas is faster)
}