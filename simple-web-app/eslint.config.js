import js from "@eslint/js";
import react from "eslint-plugin-react/configs/recommended";
import reactHooks from "eslint-plugin-react-hooks/configs/recommended";
import jsxA11y from "eslint-plugin-jsx-a11y/configs/recommended";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    js.configs.recommended,
    react,
    reactHooks,
    jsxA11y,
    ...compat.extends("eslint-config-my-config"), // if you have any additional eslintrc-style configs
    {
        files: ["**/*.js", "**/*.jsx"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parser: "@babel/eslint-parser",
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    presets: ["@babel/preset-react"]
                }
            }
        },
        rules: {
            // Your custom rules
            "semi": ["warn", "always"]
        }
    }
];
