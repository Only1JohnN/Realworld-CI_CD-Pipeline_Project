const js = require("@eslint/js");
const react = require("eslint-plugin-react/configs/recommended");
const reactHooks = require("eslint-plugin-react-hooks/configs/recommended");
const jsxA11y = require("eslint-plugin-jsx-a11y/configs/recommended");
const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const __dirname = path.resolve();

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

module.exports = [
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
