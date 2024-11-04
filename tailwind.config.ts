import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes:
            [
                "cupcake",
                {
                    spring: {
                        ...require("daisyui/src/theming/themes")["light"],
                        "primary": "#42AA00",
                        "secondary": "#7A00C2",
                        "accent": "#377CFB",
                        "--rounded-box": "1rem",
                        "--rounded-btn": "0.5rem",
                    },
                },
                "corporate",
                "dracula",
                "business",
            ],
    },
};
export default config;
