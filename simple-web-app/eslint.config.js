module.exports = [
    {
        files: ['*.js', '*.jsx'],
        languageOptions: {
            globals: {
                node: true,
                es6: true,
            },
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        plugins: {
            react: require('eslint-plugin-react'),
            'react-hooks': require('eslint-plugin-react-hooks'),
            'jsx-a11y': require('eslint-plugin-jsx-a11y'),
        },
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
            'plugin:jsx-a11y/recommended',
        ],
        parser: require('@babel/eslint-parser'),
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // Add your specific rules here
        },
    },
];
