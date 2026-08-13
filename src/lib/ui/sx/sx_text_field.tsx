export const textfieldSx = {
    "& .MuiOutlinedInput-root": {
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        "& fieldset": { borderColor: "hsl(var(--border))" },
        "&:hover fieldset": { borderColor: "hsl(var(--ring))" },
        "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
    },
    "& .MuiInputLabel-root": {
        color: "hsl(var(--muted-foreground))",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "hsl(var(--primary))",
    },
};