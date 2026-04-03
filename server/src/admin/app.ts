import AuthLogo from "./extensions/logo.png";
import MenuLogo from "./extensions/logo.png";
import favicon from "./extensions/favicon.ico"; // safer than .ico
// import "./app.css"; // optional (if you use custom CSS)

export default {
  config: {
    auth: {
      logo: AuthLogo,
    },

    head: {
      favicon: favicon,
      title: "Uncharted with Shayon 🌍",
    },

    menu: {
      logo: MenuLogo,
    },

    locales: ["bn"],

    theme: {
      light: {
        colors: {
          neutral0: "#ffffff",
          neutral100: "#f9fafc",
          neutral150: "#f3f4f6",
          neutral200: "#e5e7eb",
          neutral500: "#555555",
          neutral800: "#1a1a1a",

          primary100: "#fff4db",
          primary200: "#fde3a7",
          primary500: "#f6b234",
          primary600: "#e0a128",
          primary700: "#c88e1f",

          secondary100: "#e6ecf5",
          secondary200: "#c1cfe6",
          secondary500: "#0e3267",
          secondary600: "#0b2854",
          secondary700: "#081f42",

          danger500: "#d02b20",
          danger600: "#b72b1a",
        },
      },

      dark: {
        colors: {
          neutral0: "#1a1a1a",
          neutral100: "#121212",
          neutral150: "#1f1f1f",
          neutral200: "#2a2a2a",
          neutral500: "#a1a1aa",
          neutral800: "#f9fafc",

          primary100: "#3a2a0d",
          primary200: "#5a3f12",
          primary500: "#f6b234",
          primary600: "#ffcc66",
          primary700: "#ffd98c",

          secondary100: "#1a2740",
          secondary200: "#22345a",
          secondary500: "#0e3267",
          secondary600: "#3b5ea8",
          secondary700: "#6f8fd6",

          danger500: "#ff4d4f",
          danger600: "#ff7875",
        },
      },
    },

    tutorials: false,
    notifications: { releases: false },
  },

  bootstrap() {},
};