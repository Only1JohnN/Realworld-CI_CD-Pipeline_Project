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
            ecmaFeatures: {
                jsx: true,
            },
        },
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
            'plugin:jsx-a11y/recommended',
        ],
        parser: '@babel/eslint-parser',
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
