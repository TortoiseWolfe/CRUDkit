import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
        cupcake: "cupcake",
        bumblebee: "bumblebee",
        emerald: "emerald",
        corporate: "corporate",
        synthwave: "synthwave",
        retro: "retro",
        cyberpunk: "cyberpunk",
        valentine: "valentine",
        halloween: "halloween",
        garden: "garden",
        forest: "forest",
        aqua: "aqua",
        lofi: "lofi",
        pastel: "pastel",
        fantasy: "fantasy",
        wireframe: "wireframe",
        black: "black",
        luxury: "luxury",
        dracula: "dracula",
        cmyk: "cmyk",
        autumn: "autumn",
        business: "business",
        acid: "acid",
        lemonade: "lemonade",
        night: "night",
        coffee: "coffee",
        winter: "winter",
        dim: "dim",
        nord: "nord",
        sunset: "sunset",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;