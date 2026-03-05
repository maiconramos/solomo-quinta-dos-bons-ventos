export const ds = {
  colors: {
    primary: "brand-primary",
    secondary: "brand-secondary",
    accent: "brand-accent",
    highlight: "brand-highlight",
  },
  fonts: {
    heading: "font-heading",
    body: "font-body",
  },
  radius: {
    sm: "rounded",
    md: "rounded-lg",
    lg: "rounded-xl",
  },
  button: {
    primary: "bg-brand-accent text-white hover:opacity-90",
    secondary: "bg-brand-secondary text-white hover:opacity-90",
    outline:
      "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
  },
  text: {
    heading: "font-heading font-bold text-brand-primary",
    body: "font-body text-foreground",
    muted: "font-body text-gray-500",
  },
} as const;
